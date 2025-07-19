import Link from "next/link";
import {db} from "~/server/db";

export const dynamic = "force-dynamic"; // Force dynamic rendering for this page


export default async  function HomePage() {
  const image = await db.query.image.findMany({
    orderBy: (model, { desc }) => desc(model.id),
});
  //console.log("Posts from DB:", posts);
  return (
    <main >
      <div className="flex flex-wrap gap-4">
        {[...image , ...image].map((image , index) => (
          <div key={image.id + "-"+index} className="w-48">
            <img src={image.url}/>
            <div> {image.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
