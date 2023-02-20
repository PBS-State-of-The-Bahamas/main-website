import { GetServerSideProps } from "next";
import Member, { MemberProps } from "@/components/member/member";
import PageTemplate from "@/components/PageTemplate";
import Head from "next/head";
import LineMember, { LineMemberProps } from "@/components/lineage/line_member";
import { Terms } from "@/components/lineage/line";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { ParsedUrlQuery } from "querystring";

export default function LineMembers({ query, line_info, line_members }) {
  if (!line_members.length) {
    return <div>Line Members Not Found ...</div>;
  }

  const {
    chapter_abbreviation,
    id,
  }: { chapter_abbreviation: string; id: string } = query;

  const [lineMembers, setLineMembers] = useState(line_members);

  return (
    <div>
      <Head>
        <title>{`${line_info.ship_name}`}</title>
      </Head>
      <PageTemplate>
        <div className="md:container md:mx-auto mt-12">
          <div>
            <div className="font-bold text-xl">{line_info.chapter}</div>
            <div className="font-bold text-heading-3">Lineage</div>
            <div className="mt-4">
              <span className="text-heading-4">
                {line_info.term} {line_info.year}
              </span>
              <div className="text-heading-6">{line_info.ship_name}</div>
            </div>
          </div>
          <div className="mt-4 grid md:grid-cols-4 md:gap-4 gap-y-4">
            <InfiniteScroll
              dataLength={lineMembers.length}
              next={getLineMembers(chapter_abbreviation, id)}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p className="text-center">
                  <b>{`You've reached the end of ${line_info.ship_name}`}</b>
                </p>
              }
            >
              {lineMembers.map((line: LineMember) => (
                <Member
                  id={line.id}
                  member_name={line.member_name}
                  member_photo_url={line.member_photo_url}
                >
                  <LineMember
                    id={line.description.id}
                    line_number={line.description.line_number}
                    line_name={line.description.line_name}
                  />
                </Member>
              ))}
            </InfiniteScroll>
          </div>
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

async function getLineMembers(chapter_abbreviation: string, line_id: string) {
  const url = `http://localhost:1337/api/members?sort[0]=[line_member][line_number]&populate=*&filters[line_member][line][id][$eq]=${line_id}&filters[line_member][line][chapter][chapter_abbreviation][$eq]=${chapter_abbreviation}`;
  const token =
    "4300669fbc51d81c6ba5e2b2972dbb407e5512aecc3a8b3479a0936f75a3c9c4af610316dbcc131d0f2d30d7cb2a3c8bdd7f1c607256818c30a179f35771212ff40a172e614ccf6d3f8d0371eccf63997067c3b217566a8920875600d43d019b851c9243bc15c049e790670c25105e9bf39a64bfccef27edd065f80bb1258eba";
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
}

async function getLineInfo(chapter_abbreviation: string, line_id: string) {
  const url = `http://localhost:1337/api/lines?populate[0]=chapter&filters[chapter][chapter_abbreviation][$eq]=${chapter_abbreviation}&filters[id][$eq]=${line_id}`;
  const token =
    "4300669fbc51d81c6ba5e2b2972dbb407e5512aecc3a8b3479a0936f75a3c9c4af610316dbcc131d0f2d30d7cb2a3c8bdd7f1c607256818c30a179f35771212ff40a172e614ccf6d3f8d0371eccf63997067c3b217566a8920875600d43d019b851c9243bc15c049e790670c25105e9bf39a64bfccef27edd065f80bb1258eba";
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
}

export const getServerSideProps: GetServerSideProps<{
  query: ParsedUrlQuery;
  line_info: LineInfo;
  line_members: LineMember[];
}> = async ({ query }) => {
  let { chapter_abbreviation } = query;
  chapter_abbreviation = (chapter_abbreviation as string).toUpperCase();
  let { id } = query;
  id = id as string;

  const [json_line_members, json_line_info] = await Promise.all([
    getLineMembers(chapter_abbreviation, id),
    getLineInfo(chapter_abbreviation, id),
  ]);

  if (!json_line_members?.data?.length) {
    return {
      notFound: true,
    };
  }

  const line_members: LineMember[] = json_line_members?.data.map(
    (line: any) => {
      return {
        id: line.id,
        member_name: line.attributes?.name,
        member_photo_url: line.attributes?.photo?.data?.length
          ? `http://localhost:1337${line.attributes?.photo?.data[0].attributes?.formats?.small?.url}`
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

  if (!json_line_info?.data?.length) {
    return {
      notFound: true,
    };
  }

  const line_info: LineInfo = {
    chapter: json_line_info.data[0].attributes?.chapter?.data?.attributes.name,
    term: json_line_info.data[0].attributes?.term,
    year: json_line_info.data[0].attributes?.year,
    ship_name: json_line_info.data[0].attributes?.ship_name,
  };

  return {
    props: { query, line_info, line_members },
  };
};
