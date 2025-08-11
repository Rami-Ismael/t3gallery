import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { image } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { desc } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { UploadButton } from "~/components/UploadButton";

export default async function GalleryPage() {
  const user = await auth();
  
  if (!user.userId) {
    redirect("/");
  }

  const images = await db
    .select()
    .from(image)
    .where(eq(image.userId, user.userId))
    .orderBy(desc(image.createdAt));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Gallery</h1>
          <p className="text-gray-600 mt-2">
            {images.length} {images.length === 1 ? 'image' : 'images'} in your collection
          </p>
        </div>
        <UploadButton />
      </div>

      {images.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
            <div className="text-6xl mb-4">📷</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No images yet
            </h2>
            <p className="text-gray-600 mb-6">
              Upload your first image to start building your gallery
            </p>
            <UploadButton />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Link href={`/gallery/${img.id}`}>
                <div className="aspect-square relative bg-gray-100">
                  <Image
                    src={img.url}
                    alt={img.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              </Link>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 truncate" title={img.name}>
                  {img.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(img.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
