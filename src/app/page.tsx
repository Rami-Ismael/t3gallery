import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getImages } from "~/queries";

export const dynamic = "force-dynamic"; // Force dynamic rendering for this page

async function Images(){
  const images  = await getImages();
  console.log("Images from DB:", images);
  return (
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url}/>
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
