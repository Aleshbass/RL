"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { BookMarkedIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "./SearchInput";
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";
import BurgerMenu from "./BurgerMenu";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-rehabify-core to-rehabify-alt border-b border-rehabify-core/20">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              prefetch={false}
              className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
            >
              <Image 
                src="/logo/rehabifylearn white logo.png"
                alt="Rehabify Logo"
                width={140}
                height={40}
                className="h-8 w-auto"
                priority
                fetchPriority="high"
              />
            </Link>

            <SearchInput />
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Mobile Menu */}
            <BurgerMenu />
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2 md:space-x-4">
              <Link
                prefetch={false}
                href="/about"
                className="flex space-x-2 items-center text-sm font-medium text-white hover:text-secondary-honeydew transition-colors md:border md:border-white/20 md:rounded-md md:px-4 md:py-2 hover:bg-white/5"
              >
                <span>About Us</span>
              </Link>
              <Link
                prefetch={false}
                href="/blog"
                className="flex space-x-2 items-center text-sm font-medium text-white hover:text-secondary-honeydew transition-colors md:border md:border-white/20 md:rounded-md md:px-4 md:py-2 hover:bg-white/5"
              >
                <span>Blog</span>
              </Link>
              <Link
                prefetch={false}
                href="/my-courses"
                className="flex space-x-2 items-center text-sm font-medium text-white hover:text-secondary-honeydew transition-colors md:border md:border-white/20 md:rounded-md md:px-4 md:py-2 hover:bg-white/5"
              >
                <BookMarkedIcon className="h-4 w-4" />
                <span>My Courses</span>
              </Link>
            </nav>

            {/* Desktop Theme Toggle & Auth */}
            <div className="hidden md:flex items-center space-x-4">
              <DarkModeToggle />
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button className="bg-white text-rehabify-core hover:bg-secondary-honeydew" size="default">
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
