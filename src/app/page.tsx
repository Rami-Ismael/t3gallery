import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { DatabaseTest } from "~/components/DatabaseTest";

export default async function HomePage() {
  console.log("HomePage with safe database integration rendering!");
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <SignedOut>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">🔐 T3 Gallery</h1>
            <h2 className="text-2xl text-gray-800 mb-4">Please Sign In</h2>
            <p className="text-gray-600 mb-8">Sign in above to access your personal gallery.</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">✅ Step 2: Clerk Authentication Added!</p>
              <p className="text-sm text-blue-600 mt-2">Use the sign-in button in the top navigation.</p>
            </div>
          </div>
        </SignedOut>
        
        <SignedIn>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Welcome!</h1>
            <h2 className="text-2xl text-gray-800 mb-4">You're signed in to T3 Gallery</h2>
            <p className="text-gray-600 mb-8">Authentication is working correctly!</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800">✅ Step 2: Clerk Authentication Working!</p>
              <p className="text-sm text-green-600 mt-2">Testing database integration...</p>
            </div>
            <DatabaseTest />
            <div className="mt-6">
              <Link 
                href="/gallery"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                View My Gallery →
              </Link>
            </div>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
