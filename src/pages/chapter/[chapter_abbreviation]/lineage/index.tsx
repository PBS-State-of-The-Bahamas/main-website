import { GetServerSideProps } from "next";
import Line from "@/components/lineage/line";
import { LineProps } from "@/components/lineage/line";
import Head from "next/head";
import PageTemplate from "@/components/PageTemplate";
import Link from "next/link";
import { useState } from "react";
import { useTriggerScrollFix } from "@/hooks/triggerScroll";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Lineage({
  chapter_abbreviation,
  chapter_name,
  lineage,
}: {
  chapter_abbreviation: string;
  chapter_name: string;
  lineage: LineProps[];
}) {
  if (!lineage.length) {
    return <div>Lineage Not Found ...</div>;
  }

  const [_lineage, setLineage] = useState(lineage);
  const [hasMore, setHasMore] = useState(true);

  useTriggerScrollFix([_lineage.length]);

  const addNewLines = async (): Promise<void> => {
    const [_chapterName, additionalLines, totalLines] = await getChapterLineage(
      chapter_abbreviation as string,
      _lineage.length,
      1
    );
    setLineage((_lineage) => [..._lineage, ...additionalLines]);

    setHasMore(totalLines > _lineage.length ? true : false);
  };

  return (
    <div>
      <Head>
        <title>{`${chapter_abbreviation} Chapter Lineage`}</title>
      </Head>
      <PageTemplate>
        <div className="md:container md:mx-auto mt-12 min-h-screen">
          <span className="font-bold text-xl">{chapter_name}</span>
          <div className="font-bold text-heading-3">Lineage</div>
          <InfiniteScroll
            dataLength={_lineage ? _lineage.length : 0}
            next={() => addNewLines()}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p className="text-center text-[8px] mt-8">
                <b>{`You've reached the end of ${chapter_abbreviation}'s Chapter Lineage`}</b>
              </p>
            }
          >
            <div className="mt-4 grid md:items-center md:grid-cols-4 md:gap-4 gap-y-4">
              {lineage.map((line: any) => (
                <Link
                  href={{
                    pathname: `/chapter/${chapter_abbreviation}/line/${line.key}`,
                  }}
                >
                  <Line
                    key={line.key}
                    term={line.term}
                    year={line.year}
                    ship_name={line.ship_name}
                  />
                </Link>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </PageTemplate>
    </div>
  );
}
async function getChapterLineage(
  chapterAbbreviation: string,
  start: number,
  limit: number
): Promise<[string | undefined, LineProps[], number]> {
  chapterAbbreviation = chapterAbbreviation.toUpperCase();
  const token =
    "4300669fbc51d81c6ba5e2b2972dbb407e5512aecc3a8b3479a0936f75a3c9c4af610316dbcc131d0f2d30d7cb2a3c8bdd7f1c607256818c30a179f35771212ff40a172e614ccf6d3f8d0371eccf63997067c3b217566a8920875600d43d019b851c9243bc15c049e790670c25105e9bf39a64bfccef27edd065f80bb1258eba";

  const url = `http://localhost:1337/api/lines?populate[0]=chapter&filters[chapter][chapter_abbreviation][$eq]=${chapterAbbreviation}&pagination[start]=${start}&pagination[limit]=${limit}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const jsonChapterLineage = await response.json();
  const totalLines = jsonChapterLineage.meta?.pagination?.total;

  if (!jsonChapterLineage?.data.length) {
    return [undefined, [], totalLines];
  }
  const chapter_name =
    jsonChapterLineage.data[0].attributes?.chapter?.data?.attributes?.name;

  const lineage: LineProps[] = jsonChapterLineage?.data.map((line: any) => {
    return {
      key: line.id,
      term: line.attributes?.term,
      year: line.attributes?.year,
      ship_name: line.attributes?.ship_name,
    };
  });

  return [chapter_name, lineage, totalLines];
}

export const getServerSideProps: GetServerSideProps<{
  chapter_abbreviation: string;
  chapterName: string;
  lineage: LineProps[];
}> = async ({ query }) => {
  let { chapter_abbreviation } = query;
  chapter_abbreviation = (chapter_abbreviation as string).toUpperCase();

  const [chapterName, lineage, totalLines] = await getChapterLineage(
    chapter_abbreviation,
    0,
    1
  );

  if (!chapterName) {
    return {
      notFound: true,
    };
  }

  return {
    props: { chapter_abbreviation, chapterName, lineage },
  };
};
