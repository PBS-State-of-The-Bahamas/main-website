import Line from "@/components/lineage/line";
import { GetServerSideProps } from "next";
import { LineProps } from "@/components/lineage/line";

export default function Lineage({ lineage }: { lineage: LineProps[] }) {
  if (!lineage.length) {
    return <div>Lineage Not Found ...</div>;
  }

  return (
    <div>
      {lineage.map((line: any) => (
        <Line
          key={line.id}
          term={line.term}
          year={line.year}
          ship_name={line.ship_name}
        />
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  lineage: LineProps[];
}> = async ({ query }) => {
  const { chapter_name } = query;
  const token =
    "4300669fbc51d81c6ba5e2b2972dbb407e5512aecc3a8b3479a0936f75a3c9c4af610316dbcc131d0f2d30d7cb2a3c8bdd7f1c607256818c30a179f35771212ff40a172e614ccf6d3f8d0371eccf63997067c3b217566a8920875600d43d019b851c9243bc15c049e790670c25105e9bf39a64bfccef27edd065f80bb1258eba";
  const url = `http://localhost:1337/api/chapters?populate[0]=lines&filters[chapter_abbreviation][$eq]=${(
    chapter_name as string
  ).toUpperCase()}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json_data = await response.json();

  if (!json_data?.data?.length) {
    return {
      notFound: true,
    };
  }

  const lineage: LineProps[] = json_data?.data[0].attributes?.lines?.data.map(
    (line: any) => {
      return {
        key: line.id,
        term: line.attributes?.term,
        year: line.attributes?.year,
        ship_name: line.attributes?.ship_name,
      };
    }
  );

  return {
    props: { lineage },
  };
};
