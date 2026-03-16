import { Manhwa } from "@/lib/utils";
import ManhwaGrid from "@/components/ManhwaGrid";

const page = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/readings/manhwas`,
    { cache: "no-store" },
  );
  const manhwas: Manhwa[] = await response.json();

  return (
    <div className="ml-20 p-5">
      <h1 className="text-2xl font-bold mb-6">Manhwas</h1>
      <ManhwaGrid manhwas={manhwas} />
    </div>
  );
};

export default page;
