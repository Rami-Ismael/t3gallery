import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { image } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { DeleteButton } from "~/components/DeleteButton";
import { notFound } from "next/navigation";

interface ImagePageProps {
  params: Promise<{ id: string }>;
}

export default async function ImagePage({ params }: ImagePageProps) {
  const user = await auth();
  const { id } = await params;
  
  if (!user.userId) {
    redirect("/");
  }

  const [img] = await db
    .select()
    .from(image)
    .where(
      and(
        eq(image.id, parseInt(id)),
        eq(image.userId, user.userId)
      )
    );

  if (!img) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/gallery"
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to Gallery
        </Link>
        <DeleteButton imageId={img.id} imageName={img.name} />
      </div>

      {/* Image Display */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative aspect-video bg-gray-100">
          <Image
            src={img.url}
            alt={img.name}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>
        
        {/* Image Info */}
        <div className="p-6 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {img.name}
              </h1>
              <div className="space-y-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Uploaded:</span>{" "}
                  {new Date(img.createdAt).toLocaleString()}
                </div>
                {img.updatedAt && (
                  <div>
                    <span className="font-medium">Updated:</span>{" "}
                    {new Date(img.updatedAt).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-3">
              <a
                href={img.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                View Full Size
              </a>
              <a
                href={img.url}
                download={img.name}
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Download Image
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
