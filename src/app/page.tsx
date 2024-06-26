import { index } from "drizzle-orm/mysql-core";
import { url } from "inspector";
import Link from "next/link";

const mock_urls: string[] = [
  "https://utfs.io/f/2e3a5f02-7fc1-497a-9ee5-d82167272c67-jp8mqc.png" , 
  "https://utfs.io/f/f1b386c9-a2ef-42d7-a6cf-850493b7b81f-ohszqv.png" , 
  "https://utfs.io/f/214b0045-9894-48e2-980c-617a651f7a6a-yx0ral.jpg"

]

const mock_images = mock_urls.map( ( url , index ) => ( {
  id: index + 1 ,
  url,
} ) );

export default function HomePage() {
  return (
    <main >
      <div className="flex flex-wrap gap-4">
        { mock_images.map( ( image ) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ) ) }
      </div>
    </main>
  );
}
