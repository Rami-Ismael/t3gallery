import Link from "next/link";

const mockUrls = [
  "https://z68hkk8q7p.ufs.sh/f/upbel1v8YSdoCuFncL96TLZ0sarCc5OWIqb4vXDzihoKu1wU",
  "https://z68hkk8q7p.ufs.sh/f/upbel1v8YSdoUKKoT9MRn0SDYhT5H2MzdXFAJoKcpkx7OZlQ",
  "https://z68hkk8q7p.ufs.sh/f/upbel1v8YSdoxqMOv4Pe6pcsnrLSv30W7UomDQHlPVdyEXBx",
  "https://z68hkk8q7p.ufs.sh/f/upbel1v8YSdoCuSjObP6TLZ0sarCc5OWIqb4vXDzihoKu1wU",
  "https://z68hkk8q7p.ufs.sh/f/upbel1v8YSdoPdl8IbrprvDaTJZ3ShIknXU1ENG9s086Fo2M"
];
const mockImages = mockUrls.map((url , index) => ({
  id: index + 1,
  url: url,
}));


export default function HomePage() {
  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {mockImages.map((images) => (
          <div key={images.id} className="w-48">
            <img src={images.url}/>
          </div>
        )
      )}
      </div>
    </main>
  );
}
