import { GetServerSideProps } from "next";
import Head from "next/head";
import Section from "@/components/Section";
import Container from "@/components/Container";
import BoardMember, { BoardMemberProps } from "@/components/e-board/BoardMember";
import PageTemplate from "@/components/PageTemplate";
import { v4 } from "uuid";

export default function EBoard({boardMembers}: {boardMembers: BoardMemberProps[]}){
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
                  <div className="font-bold text-heading-2 text-center">Meet The Board</div>
                  <div className="mt-4 mb-10">
                    Lorem ipsum dolor sit amet consectetur. Hendrerit diam quis ultricies scelerisque eget et et scelerisque. 
                    Nunc aliquam morbi suscipit at sagittis. Adipiscing id at mauris ut odio dictum ultricies vitae neque. 
                    Risus arcu lectus enim egestas urna. Massa platea neque integer diam. 
                    Commodo magna sodales sagittis quisque turpis dictumst. In donec integer elit malesuada a imperdiet vel amet.
                  </div>
                </div>
                  <div className="mt-4 grid md:grid-cols-4 md:gap-4 gap-y-4">
                    {boardMembers.map((boardMember: BoardMemberProps) => (
                      <BoardMember
                        key={v4()}
                        boardMemberName={boardMember.boardMemberName}
                        boardMemberPhotoUrl={boardMember.boardMemberPhotoUrl}
                      />
                    ))}
                  </div>
              </div>
            </Container>
          </Section>
        </PageTemplate>
    </div>)
};

export const getServerSideProps: GetServerSideProps<{
    boardMembers: BoardMemberProps[];
  }> = async ({ query }) => {
  
    const boardMembers = getBoardMembers()
  
    if (!boardMembers) {
      return {
        notFound: true,
      };
    }

    return {
      props: { boardMembers},
    };
  };

function getBoardMembers(): BoardMemberProps[] {
    let boardMembers: BoardMemberProps[] = []

    for (let step = 0; step < 5; step++) {
        boardMembers.push({boardMemberName: "John Doe", boardMemberPhotoUrl: "/images/missing-member.svg"})
    }

    return boardMembers
}