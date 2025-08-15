import "server-only";
import { db } from "~/server/db";
import { auth } from "@clerk/nextjs/server";


export async function getImages(){

    const user = await auth();
    if (!user.userId) {
      throw new Error("Unauthorized");
    }
    console.log(`Fetching images for user: ${user.userId}`);
    // Fetch images from the database
    const images = await db.query.image.findMany({
      where: (model, { eq }) => eq(model.userId, user.userId),
      orderBy: (model, { desc }) => desc(model.id),
    });
    return images;
}

export async function getImageById(id: number) {
  const user = await auth();
  if (!user.userId) {
    throw new Error("Unauthorized");
  }
  console.log(`Fetching image with ID: ${id} for user: ${user.userId}`);
  
  // Fetch a single image by ID from the database
  const image = await db.query.image.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) {
    throw new Error(`Image with ID ${id} not found`);
  }

  return image;
}
