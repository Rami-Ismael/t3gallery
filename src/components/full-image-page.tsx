import {getImageById} from "~/queries";

export default async function FullPageImageView(props: { params: { id: number } }) {
   const image = await getImageById(props.params.id);
   return (
      <div className="flex h-full w-full">
         <div className="flex flex-shrink flex justify-center">
            <img src={image.url} className="flex-shrink object-contain" />
         </div>
         <div className="flex w-48 flex-shrink-0 flex-col">
            <div className="text-xl font-bold">{image.name}</div>
         </div>
      </div>
   );
}
