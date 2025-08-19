import {getImageById} from "~/queries";

export default async function FullPageImageView(props: { params: { id: number } }) {
   const image = await getImageById(props.params.id);
   return (
        <img src={image.url} alt={image.name} className="w-96" />
   );
}
