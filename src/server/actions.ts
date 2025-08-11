"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { image } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteImage(imageId: number) {
  const user = await auth();
  
  if (!user.userId) {
    throw new Error("Unauthorized");
  }

  // Verify the image belongs to the user
  const [existingImage] = await db
    .select()
    .from(image)
    .where(
      and(
        eq(image.id, imageId),
        eq(image.userId, user.userId)
      )
    );

  if (!existingImage) {
    throw new Error("Image not found or unauthorized");
  }

  // Delete the image from database
  await db
    .delete(image)
    .where(
      and(
        eq(image.id, imageId),
        eq(image.userId, user.userId)
      )
    );

  // Revalidate the gallery page
  revalidatePath("/gallery");
  
  return { success: true };
}
