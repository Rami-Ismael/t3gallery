import { SignIn, SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/utils/uploadthing";

export function TopNav(){
  return (
    <nav className="flex w-fill items-center 
    justify-between border-b p-4 text-xl font-semibold">
      <div>Gallery</div>

      <div className="flex flex-row items-center gap-4">
        <SignedOut>
            <SignInButton />
        </SignedOut>
        <SignedIn>
            <UploadButton endpoint="imageUploader" />
            <UserButton />
        </SignedIn>
     </div>
    </nav>
  );
}

