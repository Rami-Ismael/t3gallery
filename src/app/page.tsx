import Link from "next/link";
import { id } from "zod/v4/locales";
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
export default function HomePage() {
  return (
    <main >
      <div className="flex flex-wrap gap-4">
        {[...mockImages , ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url}/>
          </div>
        ))}
      </div>
    </main>
  );
}
