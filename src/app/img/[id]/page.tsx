import { getImageById } from "~/queries";
import FullPageImageView from "~/components/full-image-page";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);
  if (isNaN(idAsNumber)) {
    throw new Error("Invalid image ID");
  }
  const image = await getImageById(idAsNumber);
  return (
    <FullPageImageView params={{ id: idAsNumber }} />
  );
}