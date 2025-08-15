import { getImageById } from "~/queries";

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
  return (<div>
    <h1>{image.name}</h1>
    <img src={image.url} alt={image.name} />
    <p>Image ID: {image.id}</p>
  </div>);
}

