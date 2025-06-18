import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="text-4xl font-bold mb-4">Hello ( Gallery in Projess )</h1>
      <Link href="/gallery" className="text-lg underline hover:text-purple-300">
        Go to Gallery
      </Link>
    </main>
  );
}
