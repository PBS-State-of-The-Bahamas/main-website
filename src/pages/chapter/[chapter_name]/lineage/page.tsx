import { useRouter } from "next/router";
import Line from "@/components/lineage/line";

async function getLineageData(
  chapter_name: string | string[] | undefined
): Promise<any> {
  const res = await fetch(
    `http://localhost:1337/api/chapters?populate[0]=lines&filters[name][$eq]=${chapter_name}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Lineage() {
  const router = useRouter();
  const { chapter_name } = router.query;
  const { data } = await getLineageData(chapter_name);

  if (!data) {
    return <div>Chapter Not Found ...</div>;
  }

  const lineage = data[0].lines?.data;

  if (!lineage) {
    return <div>Lineage Not Found ...</div>;
  }

  return (
    <div>
      {lineage.map((line: any) => (
        <Line
          id={line.id}
          term={line.term}
          year={line.year}
          ship_name={line.ship_name}
        />
      ))}
    </div>
  );
}
