import { SignIn, SignInButton,SignedIn,SignedOut, UserButton } from "@clerk/nextjs";

export function TopNav() {
  return <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
    <div className="text-lg font-bold">T3 Gallery</div>
    <div className="space-x-4">
        <SignedOut>
            <SignInButton>
            </SignInButton>
        </SignedOut>
        <SignedIn>
            <UserButton />
        </SignedIn>
    </div>
  </nav>;
}

