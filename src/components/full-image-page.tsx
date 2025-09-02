import { clerkClient } from "@clerk/nextjs/server";
import {getImageById} from "~/queries";

export default async function FullPageImageView(props: { params: { id: number } }) {
   const image = await getImageById(props.params.id);
   const clerk = await clerkClient();
   const uploader_info = await clerk.users.getUser(image.userId);
   return (
      <div className="flex h-full w-full">
         <div className="flex flex-shrink flex justify-center">
            <img src={image.url} className="flex-shrink object-contain" />
         </div>
         <div className="flex w-48 flex-shrink-0 flex-col gap-2 border-l">
            <div className="border-b text-center text-lg p-2">{image.name}</div>

            <div className="flex flex-col p-2">
               <span>
                  Uploaded By
               </span>
               <span className="text-sm">{uploader_info.fullName}</span>
            </div>
            <div className=" flex flex-col p-2">
               <span>
                  Created On   
               </span>
               <span className="text-sm">{new Date(image.createdAt).toLocaleDateString()}</span>
            </div>
         </div>
      </div>
   );
}
