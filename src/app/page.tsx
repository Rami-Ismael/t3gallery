import Link from "next/link";
import {db} from "~/server/db";

export const dynamic = "force-dynamic"; // Force dynamic rendering for this page

const mockUrls = [
  "https://z68hkk8q7p.ufs.sh/f/upbel1v8YSdoVpMHjhlsRabMXsyDuUTJOCIt1oA0ZmnQNk4j",
  "https://z68hkk8q7p.ufs.sh/f/upbel1v8YSdoCuSjObP6TLZ0sarCc5OWIqb4vXDzihoKu1wU",
  "https://z68hkk8q7p.ufs.sh/f/upbel1v8YSdoWtbbkX4Mln3A5WCVzeOXaKvxogYI1Rf60iFr",
  "https://z68hkk8q7p.ufs.sh/f/upbel1v8YSdoPdl8IbrprvDaTJZ3ShIknXU1ENG9s086Fo2M"
]
const mockImages = mockUrls.map((url , index) => ({
  id:index+1,
  url: url,
}));
export default async  function HomePage() {
  const posts = await db.query.posts.findMany();
  //console.log("Posts from DB:", posts);
  return (
    <main >
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockImages , ...mockImages].map((image , index) => (
          <div key={image.id + "-"+index} className="w-48">
            <img src={image.url}/>
          </div>
        ))}
      </div>
    </main>
  );
}
