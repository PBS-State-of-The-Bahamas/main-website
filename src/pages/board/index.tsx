import { GetServerSideProps } from "next";
import Head from "next/head";
import Section from "@/components/Section";
import Container from "@/components/Container";
import BoardMember, {
  BoardMemberProps,
} from "@/components/e-board/BoardMember";
import PageTemplate from "@/components/PageTemplate";
import { v4 } from "uuid";
import getStateBoardMembers from "@/api/modules/e-board/getBoardMembers";
import getMembers from "@/api/modules/member/getMembers";

export default function EBoard({
  boardMembers,
}: {
  boardMembers: BoardMemberProps[];
}) {
  return (
    <div>
      <Head>
        <title>Bahamas State Board</title>
      </Head>
      <PageTemplate>
        <Section>
          <Container>
            <div className="min-h-screen">
              <div>
                <div className="font-bold text-heading-2 text-center">
                  Meet The Board
                </div>
                <div className="mt-4 mb-4">
                  Lorem ipsum dolor sit amet consectetur. Hendrerit diam quis
                  ultricies scelerisque eget et et scelerisque. Nunc aliquam
                  morbi suscipit at sagittis. Adipiscing id at mauris ut odio
                  dictum ultricies vitae neque. Risus arcu lectus enim egestas
                  urna. Massa platea neque integer diam. Commodo magna sodales
                  sagittis quisque turpis dictumst. In donec integer elit
                  malesuada a imperdiet vel amet.
                </div>
              </div>
              <div className="mt-4 grid md:grid-cols-4 md:gap-4 gap-y-4">
                {boardMembers.map((boardMember: BoardMemberProps) => (
                  <BoardMember
                    key={v4()}
                    memberName={boardMember.memberName}
                    memberPhotoUrl={boardMember.memberPhotoUrl}
                    position={boardMember.position}
                  />
                ))}
              </div>
            </div>
          </Container>
        </Section>
      </PageTemplate>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  boardMembers: BoardMemberProps[] | null;
}> = async ({ query }) => {
  const boardMembers = await getBoardMembers("STATE");

  if (!boardMembers) {
    return {
      notFound: true,
    };
  }

  return {
    props: { boardMembers },
  };
};

/*
1. Get Board Members for the respective chapter 
STATE created as a "chapter" because the e-board collection in Strapi has a relation to the chapter collection
2. Get Member Profile Photo 
Strapi cannot retrieve photos of eboard members in one request (without a custom query)
*/
async function getBoardMembers(
  state: string
): Promise<BoardMemberProps[] | null> {
  let boardMembers: BoardMemberProps[] = [];
  let memberNames: string[] = [];
  const [jsonEBoard, eBoardError] = await getStateBoardMembers(state);

  if (eBoardError) {
    console.log(eBoardError);
    return jsonEBoard;
  }

  jsonEBoard?.data?.data?.map((boardMember) => {
    boardMembers.push({
      memberName: boardMember?.attributes?.member?.data?.attributes?.name,
      position: boardMember?.attributes?.position,
      memberPhotoUrl: "/images/missing-member.svg",
    });
    memberNames.push(boardMember?.attributes?.member?.data?.attributes?.name);
  });

  const [jsonMembers, memberError] = await getMembers(memberNames);

  if (memberError) {
    //photo url already defaults to missing member image
    //if there is an error retreiving the member's photo url just log the error
    console.log(memberError);
  }

  jsonMembers?.data?.data?.map((member) => {
    const index = boardMembers.findIndex(
      (boardMember) => boardMember.memberName == member?.attributes?.name
    );

    //only attempt to reassign member's photo url if the member's name is found in the boardMembers array
    if (index >= 0) {
      Object.assign(boardMembers[index], {
        memberPhotoUrl: member.attributes?.photo?.data?.length
          ? `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}${member.attributes?.photo?.data[0].attributes?.formats?.small?.url}`
          : "/images/missing-member.svg",
      });
    }
  });

  return boardMembers;
}
