import { GetServerSideProps } from "next";
import Member, { MemberProps } from "@/components/member/member";
import PageTemplate from "@/components/PageTemplate";
import Head from "next/head";
import LineMember, { LineMemberProps } from "@/components/lineage/line_member";

export default function LineMembers({ line_members }) {
  if (!line_members.length) {
    return <div>Line Members Not Found ...</div>;
  }

  return (
    <PageTemplate>
      <div className="md:container md:mx-auto mt-12">
        <Head>
          <title>Chapter Lineage</title>
        </Head>
        <span className="font-bold text-xl">Chapter</span>
        <div className="font-bold text-heading-3">Lineage</div>
        <div className="flex flex-wrap mt-4 sm:justify-start justify-between grid-cols-4 sm:grid-cols-1 gap-4">
          {line_members.map((line: LineMember) => (
            <div className="md:w-1/4 w-full">
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
            </div>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
}
export interface LineMember {
  id: number;
  member_name: string;
  member_photo_url: string;
  description: LineMemberProps;
}
export const getServerSideProps: GetServerSideProps<{
  line_members: LineMember[];
}> = async ({ query }) => {
  let { chapter_abbreviation } = query;
  chapter_abbreviation = (chapter_abbreviation as string).toUpperCase();
  const { id } = query;
  const token =
    "4300669fbc51d81c6ba5e2b2972dbb407e5512aecc3a8b3479a0936f75a3c9c4af610316dbcc131d0f2d30d7cb2a3c8bdd7f1c607256818c30a179f35771212ff40a172e614ccf6d3f8d0371eccf63997067c3b217566a8920875600d43d019b851c9243bc15c049e790670c25105e9bf39a64bfccef27edd065f80bb1258eba";

  const url = `http://localhost:1337/api/members?sort[0]=[line_member][line_number]&populate=*&filters[line_member][line][id][$eq]=${id}&filters[line_member][line][chapter][chapter_abbreviation][$eq]=${chapter_abbreviation}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const json_data = await response.json();

  if (!json_data?.data?.length) {
    return {
      notFound: true,
    };
  }

  const line_members: LineMember[] = json_data?.data.map((line: any) => {
    return {
      id: line.id,
      member_name: line.attributes?.name,
      member_photo_url: `http://localhost:1337${line.attributes?.photo?.data[0].attributes?.formats?.small?.url}`,
      description: {
        id: line.attributes?.line_member?.data?.id,
        line_number:
          line.attributes?.line_member?.data?.attributes?.line_number,
        line_name: line.attributes?.line_member?.data?.attributes?.line_name,
      },
    };
  });

  return {
    props: { line_members },
  };
};
