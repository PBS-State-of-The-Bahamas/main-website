import { GetServerSideProps } from "next";
import Line from "@/components/lineage/line";
import { LineProps } from "@/components/lineage/line";
import Head from "next/head";
import PageTemplate from "@/components/PageTemplate";
import Link from "next/link";

export default function Lineage({
  chapter,
  lineage,
}: {
  chapter: string;
  lineage: LineProps[];
}) {
  if (!lineage.length) {
    return <div>Lineage Not Found ...</div>;
  }

  return (
    <PageTemplate>
      <div className="md:container md:mx-auto mt-12">
        <Head>
          <title>Chapter Lineage</title>
        </Head>
        <span className="font-bold text-xl">{chapter}</span>
        <div className="font-bold text-heading-3">Lineage</div>
        <div className="flex flex-wrap mt-4 sm:justify-start justify-between grid-cols-4 sm:grid-cols-1 gap-4">
          {lineage.map((line: any) => (
            <Link
              className="md:w-1/4 w-full"
              href={{
                pathname: "/products",
                query: { product: "1" },
              }}
            >
              <Line
                key={line.id}
                term={line.term}
                year={line.year}
                ship_name={line.ship_name}
              />
            </Link>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
}

export const getServerSideProps: GetServerSideProps<{
  chapter: string;
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

  const chapter = json_data?.data[0].attributes?.name;
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
    props: { chapter, lineage },
  };
};
