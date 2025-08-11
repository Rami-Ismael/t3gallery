"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { UploadButton } from "~/components/UploadButton";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-lg font-bold hover:text-blue-600 transition-colors">
          T3 Gallery
        </Link>
        <SignedIn>
          <Link 
            href="/gallery" 
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Gallery
          </Link>
        </SignedIn>
      </div>
      
      <div className="flex items-center space-x-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        
        <SignedIn>
          <UploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

