import { SignedIn, SignedOut } from "@clerk/nextjs";
import { index } from "drizzle-orm/mysql-core";
import { url } from "inspector";
import Link from "next/link";
import { db } from "~/server/db";

export const  dynamic = "force-dynamic";

async function Images() {
    const images = await db.query.images.findMany({
      orderBy: ( model , {desc}) => desc(model.id),
    });
    return (
    <div className="flex flex-wrap gap-4">
        { [...images , ...images , ...images].map( ( image , index ) => (
          <div key={image.id + "-"+ index } className="w-48">
            <img src={image.url} />
            <div> {image.name} </div>
          </div>
        ) ) }
      </div>
    );
}

export default async function HomePage() {



  return (
    <main >
      <SignedOut>
        <div className="h-full w-full text-2xl text-center">Please sign in above</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>

    </main>
  );
}
