import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { getImages } from "~/queries";

export const dynamic = "force-dynamic"; // Force dynamic rendering for this page

async function Images(){
  const images  = await getImages();
  console.log("Images from DB:", images);
  return (
      <div className="flex flex-wrap justify-center gap-4">
        {images.map((image) => (
          <div key={image.id} className="w-48">
            <Image 
            src={image.url}
            style = {{objectFit:"contain"}}
            width={192}
            height={192}
            alt={image.name}
            />
            <div> {image.name}</div>
          </div>
        ))}
      </div>
  )
}
export default async  function HomePage() {

  //console.log("Posts from DB:", posts);
  return (
    <main >
      <SignedOut>
        <div>
          <div className="h-full w-full text-2xl">Please Sing in above</div>
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
