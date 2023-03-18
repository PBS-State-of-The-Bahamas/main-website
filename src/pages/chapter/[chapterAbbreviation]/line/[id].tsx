import { GetServerSideProps } from "next";
import Member from "@/components/member/member";
import PageTemplate from "@/components/PageTemplate";
import Head from "next/head";
import LineMember, { LineMemberProps } from "@/components/lineage/line_member";
import { Terms } from "@/components/lineage/line";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { ParsedUrlQuery } from "querystring";
import getChapterLineMembers from "@/api/modules/chapterLineage/getChapterLineMembers";
import getChapterLine from "@/api/modules/chapterLineage/getChapterLine";

export default function LineMembers({
  query,
  lineInfo,
  lineMembers,
  totalLineMembers,
  strapiUrl,
  strapiToken,
}: {
  query: ParsedUrlQuery;
  lineInfo: LineInfo;
  lineMembers: LineMember[];
  totalLineMembers: number;
  strapiUrl: string | undefined;
  strapiToken: string | undefined;
}) {
  const { chapterAbbreviation, id } = query;
  const [_lineMembers, setLineMembers] = useState(lineMembers);
  const [hasMore, setHasMore] = useState(totalLineMembers > lineMembers.length ? true : false);

  if (!lineMembers.length) {
    return <div>Line Members Not Found ...</div>;
  }

  const addNewLineMembers = async (): Promise<void> => {
    const [additionalLineMembers, _totalLineMembers] = await getLineMembers(
      chapterAbbreviation as string,
      id as string,
      _lineMembers.length.toString(),
      "10",
      strapiUrl,
      strapiToken,
    );
    setLineMembers((_lineMembers) => [
      ..._lineMembers,
      ...additionalLineMembers,
    ]);

    setHasMore(totalLineMembers > _lineMembers.length ? true : false);
  };

  return (
    <div>
      <Head>
        <title>{`${lineInfo.shipName}`}</title>
      </Head>
      <PageTemplate>
        <div className="md:container md:mx-auto mt-12 min-h-screen">
          <div>
            <div className="font-bold text-xl">{lineInfo.chapter}</div>
            <div className="font-bold text-heading-3">Lineage</div>
            <div className="mt-4">
              <span className="text-heading-4">
                {lineInfo.term} {lineInfo.year}
              </span>
              <div className="text-heading-6">{lineInfo.shipName}</div>
            </div>
          </div>
          <InfiniteScroll
            dataLength={_lineMembers ? _lineMembers.length : 0}
            next={() => addNewLineMembers()}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p className="text-center text-[8px] mt-8">
                <b>{`You've reached the end of ${lineInfo.shipName}`}</b>
              </p>
            }
          >
            <div className="mt-4 grid md:grid-cols-4 md:gap-4 gap-y-4">
              {_lineMembers.map((line: LineMember) => (
                <Member
                  key={line.id}
                  memberName={line.memberName}
                  memberPhotoUrl={line.memberPhotoUrl}
                >
                  <LineMember
                    key={line.description.id}
                    id={line.description.id}
                    lineNumber={line.description.lineNumber}
                    lineName={line.description.lineName}
                  />
                </Member>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </PageTemplate>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  query: ParsedUrlQuery;
  lineInfo: LineInfo;
  lineMembers: LineMember[];
  strapiUrl: string | undefined;
  strapiToken: string | undefined;
}> = async ({ query }) => {
  let strapiUrl = process.env.NEXT_PUBLIC_API_URL;
  const strapiToken = process.env.NEXT_PUBLIC_TOKEN;

  let { chapterAbbreviation } = query;
  chapterAbbreviation = (chapterAbbreviation as string).toUpperCase();
  let { id } = query;
  id = id as string;

  const [[lineMembers, totalLineMembers], lineInfo] = await Promise.all([
    getLineMembers(chapterAbbreviation, id, "0", "10",strapiUrl, strapiToken),
    getLineInfo(chapterAbbreviation, id),
  ]);

  if (!lineInfo) {
    return {
      notFound: true,
    };
  }

  if (process.env.NODE_ENV === "production") {
    strapiUrl = process.env.STRAPI_EXTERNAL_URL;
  }

  return {
    props: { query, lineInfo, lineMembers, totalLineMembers, strapiUrl, strapiToken,},
  };
};

export interface LineMember {
  id: number;
  memberName: string;
  memberPhotoUrl: string;
  description: LineMemberProps;
}

async function getLineMembers(
  chapterAbbreviation: string,
  lineID: string,
  start: string,
  limit: string,
  strapiUrl: string | undefined,
  strapiToken: string | undefined
): Promise<[LineMember[], number]> {
  const [jsonLineMembers, error] = await getChapterLineMembers(
    chapterAbbreviation,
    lineID,
    start,
    limit,
    strapiUrl,
    strapiToken
  );

  if (error) {
    console.log(error);
    return [[], 0];
  }

  const lineMembers: LineMember[] = jsonLineMembers?.data?.data.map(
    (line: any) => {
      return {
        id: line.id,
        memberName: line.attributes?.name,
        memberPhotoUrl: line.attributes?.photo?.data?.length
          ? `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}${line.attributes?.photo?.data[0].attributes?.formats?.small?.url}`
          : "/images/missing-member.svg",
        description: {
          id: line.attributes?.line_member?.data?.id,
          lineNumber:
            line.attributes?.line_member?.data?.attributes?.line_number,
          lineName: line.attributes?.line_member?.data?.attributes?.line_name,
        },
      };
    }
  );

  return [lineMembers, jsonLineMembers.data?.meta?.pagination?.total];
}

export interface LineInfo {
  chapter: string;
  term: Terms;
  year: number;
  shipName: string;
}

async function getLineInfo(
  chapterAbbreviation: string,
  lineID: string
): Promise<LineInfo | undefined> {
  const [jsonLineInfo, error] = await getChapterLine(
    chapterAbbreviation,
    lineID
  );

  if (error) {
    console.log(error);
    return undefined;
  }

  if (!jsonLineInfo?.data?.data.length) {
    return undefined;
  }

  const lineInfo: LineInfo = {
    chapter:
      jsonLineInfo.data?.data[0].attributes?.chapter?.data?.attributes?.name,
    term: jsonLineInfo.data?.data[0].attributes?.term,
    year: jsonLineInfo.data?.data[0].attributes?.year,
    shipName: jsonLineInfo.data?.data[0].attributes?.ship_name,
  };

  return lineInfo;
}
