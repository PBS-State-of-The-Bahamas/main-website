import { GetServerSideProps } from "next";
import Line from "@/components/lineage/line";
import { LineProps } from "@/components/lineage/line";
import Head from "next/head";
import PageTemplate from "@/components/PageTemplate";
import Link from "next/link";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import getChapterLines from "@/api/modules/chapterLineage/getChapterLines";

export default function Lineage({
  chapterAbbreviation,
  chapter_name,
  lineage,
}: {
  chapterAbbreviation: string;
  chapter_name: string;
  lineage: LineProps[];
}) {
  if (!lineage.length) {
    return <div>Lineage Not Found ...</div>;
  }

  const [_lineage, setLineage] = useState(lineage);
  const [hasMore, setHasMore] = useState(true);

  const addNewLines = async (): Promise<void> => {
    const [_chapterName, additionalLines, totalLines] = await getChapterLineage(
      chapterAbbreviation,
      _lineage.length.toString(),
      "10"
    );
    setLineage((_lineage) => [..._lineage, ...additionalLines]);
    setHasMore(totalLines > _lineage.length ? true : false);
  };

  return (
    <div>
      <Head>
        <title>{`${chapterAbbreviation} Chapter Lineage`}</title>
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
                <b>{`You've reached the end of ${chapterAbbreviation}'s Chapter Lineage`}</b>
              </p>
            }
          >
            <div className="mt-4 grid md:items-center md:grid-cols-4 md:gap-4 gap-y-4">
              {_lineage.map((line: any, index: number) => (
                <Link
                  href={{
                    pathname: `/chapter/${chapterAbbreviation}/line/${line.id}`,
                  }}
                  key={index}
                >
                  <Line
                    id={line.id}
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
  start: string,
  limit: string
): Promise<[string | undefined, LineProps[], number]> {
  const [jsonChapterLineage, error] = await getChapterLines(
    chapterAbbreviation,
    start,
    limit
  );

  if (error) {
    console.log(error);
    return [undefined, [], 0];
  }

  const totalLines = jsonChapterLineage?.data?.meta?.pagination?.total;

  if (!jsonChapterLineage?.data?.data.length) {
    return [undefined, [], 0];
  }
  const chapter_name =
    jsonChapterLineage.data?.data[0].attributes?.chapter?.data?.attributes
      ?.name;

  const lineage: LineProps[] = jsonChapterLineage?.data?.data?.map(
    (line: any) => {
      return {
        id: line.id,
        term: line.attributes?.term,
        year: line.attributes?.year,
        ship_name: line.attributes?.ship_name,
      };
    }
  );

  return [chapter_name, lineage, totalLines];
}

export const getServerSideProps: GetServerSideProps<{
  chapterAbbreviation: string;
  chapterName: string;
  lineage: LineProps[];
}> = async ({ query }) => {
  let { chapterAbbreviation } = query;
  chapterAbbreviation = (chapterAbbreviation as string).toUpperCase();

  const [chapterName, lineage, totalLines] = await getChapterLineage(
    chapterAbbreviation,
    "0",
    "10"
  );

  if (!chapterName) {
    return {
      notFound: true,
    };
  }

  return {
    props: { chapterAbbreviation, chapterName, lineage },
  };
};
