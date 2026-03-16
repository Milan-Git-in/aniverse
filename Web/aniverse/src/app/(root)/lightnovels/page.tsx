import { LightNovel } from "@/lib/utils";
import LightNovelGrid from "@/components/LightNovelGrid";

const page = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/readings/lightnovels`,
    { cache: "no-store" },
  );
  const lightnovels: LightNovel[] = await response.json();

  return (
    <div className="ml-20 p-5">
      <h1 className="text-2xl font-bold mb-6">Lightnovels</h1>
      <LightNovelGrid lightnovels={lightnovels} />
    </div>
  )
}

export default page