import { getImageById } from "~/queries";
import FullPageImageView from "~/components/full-image-page";

export default async function PhotoModal(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;

  const {
    id: photoId
  } = params;

  const idAsNumber = Number(photoId);
  if (isNaN(idAsNumber)) {
    throw new Error("Invalid image ID");
  }
  const image = await getImageById(idAsNumber);
  return (
    <FullPageImageView params={{ id: idAsNumber }} />
  );
}