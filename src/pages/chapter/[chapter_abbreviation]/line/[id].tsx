import { GetServerSideProps } from "next";
import { MemberProps } from "@/components/member/member";

export default function LineMembers({ chapter_abbreviaton, id }) {
  return <div></div>;
}

export const getServerSideProps: GetServerSideProps<{
  line_members: MemberProps[];
}> = async ({ query }) => {
  let { chapter_abbreviation } = query;
  chapter_abbreviation = (chapter_abbreviation as string).toUpperCase();
  const { id } = query;
  const token =
    "4300669fbc51d81c6ba5e2b2972dbb407e5512aecc3a8b3479a0936f75a3c9c4af610316dbcc131d0f2d30d7cb2a3c8bdd7f1c607256818c30a179f35771212ff40a172e614ccf6d3f8d0371eccf63997067c3b217566a8920875600d43d019b851c9243bc15c049e790670c25105e9bf39a64bfccef27edd065f80bb1258eba";

  const url = `http://localhost:1337/api/members?sort[0]=[line_member][line_number]&populate=*&filters[line_member][line][id][$eq]=${id}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const json_data = await response.json();

  if (!json_data?.data?.length) {
    return {
      notFound: true,
    };
  }

  const line_members: MemberProps[] = json_data?.data.map((line: any) => {
    return {
      key: line.attributes?.member?.data?.attributes?.id,
      member_name: line.attributes?.member?.data?.attributes?.name,
      member_photo_url: line.attributes?.year,
      ship_name: line.attributes?.ship_name,
    };
  });

  return {
    props: { line_members },
  };
};
