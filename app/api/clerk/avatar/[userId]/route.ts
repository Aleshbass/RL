import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await (await clerkClient()).users.getUser(params.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ imageUrl: user.imageUrl });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch avatar" }, { status: 500 });
  }
}
