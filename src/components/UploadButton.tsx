"use client";

import { UploadButton as UTButton } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function UploadButton() {
  const router = useRouter();

  return (
    <UTButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        console.log("Files uploaded:", res);
        toast.success("Upload completed!");
        router.refresh();
      }}
      onUploadError={(error: Error) => {
        console.error("Upload error:", error);
        toast.error(`Upload failed: ${error.message}`);
      }}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors ut-button:bg-blue-600 ut-button:hover:bg-blue-700"
    />
  );
}
