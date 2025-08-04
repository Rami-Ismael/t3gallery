import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { image } from "~/server/db/schema";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 40 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = auth();

      // If you throw, the user will not be able to upload
      if (!(await user).userId) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: (await user).userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      if (!file.name || !file.ufsUrl || !metadata.userId) {
        throw new UploadThingError("Missing required file or user information");
      }
      await db.insert(image).values({
        // Change 'name' to 'fileName' if your schema uses 'fileName'
        name: file.name,
        url: file.ufsUrl,
        userId: metadata.userId,
      });

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
