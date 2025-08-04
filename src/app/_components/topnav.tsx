"use client";
import { SignIn, SignInButton,SignedIn,SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";
export function TopNav() {
  const router = useRouter();
  return <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
    <div className="text-lg font-bold">T3 Gallery</div>
    <div className="flex flex-row">
        <SignedOut>
            <SignInButton>
            </SignInButton>
        </SignedOut>
        <SignedIn>
          <UploadButton 
          endpoint="imageUploader" 
          onClientUploadComplete={ () => {
            router.refresh();
          }}
          />
            <UserButton />
        </SignedIn>
    </div>
  </nav>;
}

