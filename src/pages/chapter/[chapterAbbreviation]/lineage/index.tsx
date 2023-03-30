import { GetServerSideProps } from "next";
import Line from "@/components/lineage/line";
import { LineProps } from "@/components/lineage/line";
import Head from "next/head";
import PageTemplate from "@/components/PageTemplate";
import Link from "next/link";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import getChapterLines from "@/api/modules/chapterLineage/getChapterLines";
import { v4 } from "uuid";
import Container from "@/components/Container";
import Section from "@/components/Section";

export default function Lineage({
  chapterAbbreviation,
  chapterName,
  lineage,
  totalLines,
  strapiUrl,
  strapiToken,
}: {
  chapterAbbreviation: string;
  chapterName: string;
  lineage: LineProps[];
  totalLines: number;
  strapiUrl: string | undefined;
  strapiToken: string | undefined;
}) {
  const [_lineage, setLineage] = useState(lineage);
  const [hasMore, setHasMore] = useState(
    totalLines > lineage.length ? true : false
  );

  if (!lineage.length) {
    return <div>Lineage Not Found ...</div>;
  }

  const addNewLines = async (): Promise<void> => {
    const [_chapterName, additionalLines, _totalLines] =
      await getChapterLineage(
        chapterAbbreviation,
        _lineage.length.toString(),
        "10",
        strapiUrl,
        strapiToken
      );
    setLineage((_lineage) => [..._lineage, ...additionalLines]);
    setHasMore(_totalLines > _lineage.length ? true : false);
  };

  return (
    <div>
      <Head>
        <title>{`${chapterAbbreviation} Chapter Lineage`}</title>
      </Head>
      <PageTemplate>
        <Section>
          <div className="min-h-screen">
            <span className="font-bold text-xl">{chapterName}</span>
            <div className="font-bold text-heading-3">Lineage</div>
            <InfiniteScroll
              dataLength={_lineage ? _lineage.length : 0}
              next={() => addNewLines()}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p className="text-center text-xs mt-8">
                  <b>{`You've reached the end of the chapter lineage for ${chapterAbbreviation}`}</b>
                </p>
              }
            >
              <div className="mt-4 grid md:items-center md:grid-cols-4 md:gap-4 gap-y-4">
                {_lineage.map((line: any, index: number) => (
                  <Link
                    href={{
                      pathname: `/chapter/${chapterAbbreviation}/line/${line.id}`,
                    }}
                    key={v4()}
                  >
                    <Line
                      key={line.id}
                      term={line.term}
                      year={line.year}
                      shipName={line.shipName}
                    />
                  </Link>
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </Section>
      </PageTemplate>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  chapterAbbreviation: string;
  chapterName: string;
  lineage: LineProps[];
  totalLines: number;
  strapiUrl: string | undefined;
  strapiToken: string | undefined;
}> = async ({ query }) => {
  let strapiUrl = process.env.NEXT_PUBLIC_API_URL;
  const strapiToken = process.env.NEXT_PUBLIC_TOKEN;

  let { chapterAbbreviation } = query;
  chapterAbbreviation = (chapterAbbreviation as string).toUpperCase();

  const [chapterName, lineage, totalLines] = await getChapterLineage(
    chapterAbbreviation,
    "0",
    "10",
    strapiUrl,
    strapiToken
  );

  if (!chapterName) {
    return {
      notFound: true,
    };
  }

  if (process.env.NODE_ENV === "production") {
    strapiUrl = process.env.STRAPI_EXTERNAL_URL;
  }

  return {
    props: {
      chapterAbbreviation,
      chapterName,
      lineage,
      totalLines,
      strapiUrl,
      strapiToken,
    },
  };
};

async function getChapterLineage(
  chapterAbbreviation: string,
  start: string,
  limit: string,
  strapiUrl: string | undefined,
  strapiToken: string | undefined
): Promise<[string | undefined, LineProps[], number]> {
  const [jsonChapterLineage, error] = await getChapterLines(
    chapterAbbreviation,
    start,
    limit,
    strapiUrl,
    strapiToken
  );

  if (error) {
    console.log(error);
    return [undefined, [], 0];
  }

  const totalLines = jsonChapterLineage?.data?.meta?.pagination?.total;

  if (!jsonChapterLineage?.data?.data.length) {
    return [undefined, [], 0];
  }
  const chapterName =
    jsonChapterLineage.data?.data[0].attributes?.chapter?.data?.attributes
      ?.name;

  const lineage: LineProps[] = jsonChapterLineage?.data?.data?.map(
    (line: any) => {
      return {
        id: line.id,
        term: line.attributes?.term,
        year: line.attributes?.year,
        shipName: line.attributes?.ship_name,
      };
    }
  );

  return [chapterName, lineage, totalLines];
}
