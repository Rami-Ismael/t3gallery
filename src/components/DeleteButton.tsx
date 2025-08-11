"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteImage } from "~/server/actions";

interface DeleteButtonProps {
  imageId: number;
  imageName: string;
}

export function DeleteButton({ imageId, imageName }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteImage(imageId);
      toast.success("Image deleted successfully");
      router.push("/gallery");
      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete image");
    } finally {
      setIsDeleting(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Delete "{imageName}"?</span>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-sm font-medium py-1 px-3 rounded transition-colors"
        >
          {isDeleting ? "Deleting..." : "Yes"}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm font-medium py-1 px-3 rounded transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
    >
      Delete Image
    </button>
  );
}
