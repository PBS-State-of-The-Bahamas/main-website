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
                <div className="font-bold text-heading-2">Meet The Board</div>
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

async function getBoardMembers(
  state: string
): Promise<BoardMemberProps[] | null> {
  let boardMembers: BoardMemberProps[] = [];
  const [jsonEBoard, eBoardError] = await getStateBoardMembers(state);

  if (eBoardError) {
    console.log(eBoardError);
    return jsonEBoard;
  }

  jsonEBoard?.data?.data?.map((boardMember) => {
    boardMembers.push({
      memberName: boardMember?.attributes?.member?.data?.attributes?.name,
      position: boardMember?.attributes?.position,
      memberPhotoUrl: boardMember.attributes?.member?.data?.attributes?.photo
        ?.data?.length
        ? `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}${boardMember.attributes?.member?.data?.attributes?.photo?.data[0].attributes?.formats?.small?.url}`
        : "/images/missing-member.svg",
    });
  });

  return boardMembers;
}
