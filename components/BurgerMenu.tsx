"use client";

import { BookMarked, Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import { useState } from "react";

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative focus:outline-none active:outline-none border-none shadow-none bg-transparent hover:bg-transparent md:hidden"
        >
          <Menu className="h-7 w-7 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[320px] flex flex-col bg-gradient-to-br from-rehabify-core/5"
      >
        <SheetHeader className="mb-4">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex-1 flex flex-col">
          <nav className="space-y-3">
            <Link
              href="/about"
              onClick={handleClose}
              className="block py-2 px-4 text-base font-semibold rounded-md transition-colors hover:bg-rehabify-core/10"
            >
              About Us
            </Link>
            <Link
              href="/courses"
              onClick={handleClose}
              className="block py-2 px-4 text-base font-semibold rounded-md transition-colors hover:bg-rehabify-core/10"
            >
              Courses
            </Link>
            <Link
              href="/blog"
              onClick={handleClose}
              className="block py-2 px-4 text-base font-semibold rounded-md transition-colors hover:bg-rehabify-core/10"
            >
              Blog
            </Link>
            <Link
              href="/my-courses"
              onClick={handleClose}
              className="flex items-center gap-2 py-2 px-4 text-base font-semibold rounded-md transition-colors hover:bg-rehabify-core/10"
            >
              <BookMarked className="h-5 w-5" />
              <span>My Courses</span>
            </Link>
          </nav>
          <div className="mt-auto pt-6 border-t flex items-center gap-4 px-4">
            <div className="flex-1 flex items-center gap-4 justify-center">
              <div className="scale-125">
                <DarkModeToggle />
              </div>
              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{ elements: { avatarBox: "h-12 w-12" } }}
                />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button className="h-12 text-base px-6">Sign In</Button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}