import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { image } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function DatabaseTest() {
  try {
    const user = await auth();
    if (!user.userId) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <p className="text-yellow-800">⚠️ No user authenticated</p>
        </div>
      );
    }

    // Try to query the images table
    const userImages = await db
      .select()
      .from(image)
      .where(eq(image.userId, user.userId))
      .limit(5);

    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
        <p className="text-green-800">✅ Step 4: Database Connection Working!</p>
        <p className="text-sm text-green-600 mt-2">
          Connected to Neon PostgreSQL
        </p>
        <p className="text-sm text-green-600">
          Your images: {userImages.length} found
        </p>
        {userImages.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-green-500">Recent images:</p>
            <ul className="text-xs text-green-600 ml-4">
              {userImages.map((img) => (
                <li key={img.id}>• {img.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Database connection error:", error);
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
        <p className="text-red-800">❌ Database Connection Error</p>
        <p className="text-sm text-red-600 mt-2">
          Check server logs for details
        </p>
        <p className="text-xs text-red-500 mt-1">
          Error: {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }
}
