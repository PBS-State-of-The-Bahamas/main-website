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
}: {
  query: ParsedUrlQuery;
  lineInfo: LineInfo;
  lineMembers: LineMember[];
  totalLineMembers: number;
}) {
  if (!lineMembers.length) {
    return <div>Line Members Not Found ...</div>;
  }

  const { chapter_abbreviation, id } = query;
  const [_lineMembers, setLineMembers] = useState(lineMembers);
  const [hasMore, setHasMore] = useState(true);

  const addNewLineMembers = async (): Promise<void> => {
    const [additionalLineMembers, _totalLineMembers] = await getLineMembers(
      chapter_abbreviation as string,
      id as string,
      _lineMembers.length.toString(),
      "10"
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
        <title>{`${lineInfo.ship_name}`}</title>
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
              <div className="text-heading-6">{lineInfo.ship_name}</div>
            </div>
          </div>
          <InfiniteScroll
            dataLength={_lineMembers ? _lineMembers.length : 0}
            next={() => addNewLineMembers()}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p className="text-center text-[8px] mt-8">
                <b>{`You've reached the end of ${lineInfo.ship_name}`}</b>
              </p>
            }
          >
            <div className="mt-4 grid md:grid-cols-4 md:gap-4 gap-y-4">
              {_lineMembers.map((line: LineMember, index: number) => (
                <Member
                  key={line.id}
                  member_name={line.member_name}
                  member_photo_url={line.member_photo_url}
                >
                  <LineMember
                    key={line.description.id}
                    id={line.description.id}
                    line_number={line.description.line_number}
                    line_name={line.description.line_name}
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

export interface LineMember {
  id: number;
  member_name: string;
  member_photo_url: string;
  description: LineMemberProps;
}

export interface LineInfo {
  chapter: string;
  term: Terms;
  year: number;
  ship_name: string;
}

async function getLineMembers(
  chapter_abbreviation: string,
  line_id: string,
  start: string,
  limit: string
): Promise<[LineMember[], number]> {
  const [jsonLineMembers, error] = await getChapterLineMembers(
    chapter_abbreviation,
    line_id,
    start,
    limit
  );

  if (error) {
    console.log(error);
    return [[], 0];
  }

  const lineMembers: LineMember[] = jsonLineMembers?.data?.data.map(
    (line: any) => {
      return {
        id: line.id,
        member_name: line.attributes?.name,
        member_photo_url: line.attributes?.photo?.data?.length
          ? `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}${line.attributes?.photo?.data[0].attributes?.formats?.small?.url}`
          : "/images/missing-member.svg",
        description: {
          id: line.attributes?.line_member?.data?.id,
          line_number:
            line.attributes?.line_member?.data?.attributes?.line_number,
          line_name: line.attributes?.line_member?.data?.attributes?.line_name,
        },
      };
    }
  );

  return [lineMembers, jsonLineMembers.data?.meta?.pagination?.total];
}

async function getLineInfo(
  chapter_abbreviation: string,
  line_id: string
): Promise<LineInfo | undefined> {
  const [jsonLineInfo, error] = await getChapterLine(
    chapter_abbreviation,
    line_id
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
      jsonLineInfo.data?.data[0].attributes?.chapter?.data?.attributes.name,
    term: jsonLineInfo.data?.data[0].attributes?.term,
    year: jsonLineInfo.data?.data[0].attributes?.year,
    ship_name: jsonLineInfo.data?.data[0].attributes?.ship_name,
  };

  return lineInfo;
}

export const getServerSideProps: GetServerSideProps<{
  query: ParsedUrlQuery;
  lineInfo: LineInfo;
  lineMembers: LineMember[];
}> = async ({ query }) => {
  let { chapter_abbreviation } = query;
  chapter_abbreviation = (chapter_abbreviation as string).toUpperCase();
  let { id } = query;
  id = id as string;

  const [[lineMembers, totalLineMembers], lineInfo] = await Promise.all([
    getLineMembers(chapter_abbreviation, id, "0", "1"),
    getLineInfo(chapter_abbreviation, id),
  ]);

  if (!lineInfo) {
    return {
      notFound: true,
    };
  }

  return {
    props: { query, lineInfo, lineMembers, totalLineMembers },
  };
};
