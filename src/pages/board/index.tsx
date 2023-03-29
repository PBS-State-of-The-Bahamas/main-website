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
import getStateBoardPageContent from "@/api/modules/e-board/getStateBoardPageContents";

export default function EBoard({
  boardMembers,
  opening_paragraph,
}: {
  boardMembers: BoardMemberProps[];
  opening_paragraph: string;
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
                <div className="mt-4 mb-4">{opening_paragraph}</div>
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
  opening_paragraph: string;
}> = async ({ query }) => {
  const [boardMembers, [stateBoardContent, stateBoardContentError]] =
    await Promise.all([getBoardMembers("STATE"), getStateBoardPageContent()]);

  if (!boardMembers) {
    return {
      notFound: true,
    };
  }

  if (stateBoardContentError) {
    console.log(stateBoardContentError);
  }

  const opening_paragraph =
    stateBoardContent?.data?.data?.attributes?.opening_paragraph;

  return {
    props: { boardMembers, opening_paragraph },
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
