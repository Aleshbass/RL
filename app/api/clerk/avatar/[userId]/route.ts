import { NextResponse } from 'next/server';
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(request: Request) {
  // Extract userId from URL path
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const userId = pathParts[pathParts.length - 1];
  try {
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ imageUrl: user.imageUrl });
  } catch (error) {
    console.error("Error fetching user avatar:", error);
    return NextResponse.json(
      { error: "Failed to fetch avatar" },
      { status: 500 }
    );
  }
}