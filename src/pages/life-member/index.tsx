import LifeMember, {
  LifeMemberProps,
} from "@/components/lifeMember/life-member";
import Member from "@/components/member/member";
import PageTemplate from "@/components/PageTemplate";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { v4 } from "uuid";

export default function LifeMembers({
  lifeMembers,
  totalLifeMembers,
}: {
  lifeMembers: LifeMembers;
  totalLifeMembers: number;
}) {
  const [_lifeMembers, setLineMembers] = useState(lifeMembers);
  const [hasMore, setHasMore] = useState(true);

  Object.entries(lifeMembers).forEach(([key, value]) => {
    if (!value.length) {
      return <div>Life Members Not Found ...</div>;
    }
  });

  const addNewLifeMembers = async (): Promise<void> => {
    const [additionalLifeMembers, _totalLifeMembers] = await getLifeMembers(
      0,
      0
    );
    setLineMembers((_lineMembers) => [
      ..._lineMembers,
      ...additionalLifeMembers,
    ]);

    setHasMore(totalLifeMembers > _lifeMembers.length ? true : false);
  };

  return (
    <div>
      <Head>
        <title>Life Members</title>
      </Head>
      <PageTemplate>
        <div className="min-h-screen">
          <div className="text-heading-3 text-">Sigma Bahamas Life Members</div>
          <div className="pt-2">
            Lorem ipsum dolor sit amet consectetur. Hendrerit diam quis
            ultricies scelerisque eget et et scelerisque. Nunc aliquam morbi
            suscipit at sagittis. Adipiscing id at mauris ut odio dictum
            ultricies vitae neque. Risus arcu lectus enim egestas urna. Massa
            platea neque integer diam. Commodo magna sodales sagittis quisque
            turpis dictumst. In donec integer elit malesuada a imperdiet vel
            amet.
          </div>
          <InfiniteScroll
            dataLength={_lifeMembers ? _lifeMembers.length : 0}
            next={() => addNewLifeMembers()}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p className="text-center text-[8px] mt-8">
                <b>{`You've reached the end of the life members in the state of The Bahamas`}</b>
              </p>
            }
          >
            <div className="mt-4 grid md:grid-cols-4 md:gap-4 gap-y-4">
              {_lifeMembers.map((line: LifeMember) => (
                <Member
                  key={line.id}
                  memberName={line.memberName}
                  memberPhotoUrl={line.memberPhotoUrl}
                >
                  <LifeMember
                    key={v4()}
                    shipName={line.description.shipName}
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

export interface LifeMember {
  id: number;
  memberName: string;
  memberPhotoUrl: string;
  lifeMembershipYear: number;
  description: LifeMemberProps;
}

export const getServerSideProps: GetServerSideProps<{
  lifeMembers: LifeMembers;
  totalLifeMembers: number;
}> = async () => {
  const [lifeMembers, totalLifeMembers] = getLifeMembers(0, 10);
  return { props: { lifeMembers, totalLifeMembers } };
};

export interface LifeMembers {
  [key: number]: LifeMember[];
}

function getLifeMembers(start: number, limit: number): [LifeMembers, number] {
  let lifeMembers: LifeMembers = undefined;

  const lifeMemberDesc: LifeMemberProps = {
    shipName: "DOD",
    lineName: "monster",
  };
  const lifeMember: LifeMember = {
    id: 0,
    memberName: "John Doe",
    memberPhotoUrl: "/images/missing-member.svg",
    lifeMembershipYear: 2023,
    description: lifeMemberDesc,
  };

  let _lifeMembers: LifeMember[] = [];

  //generate List
  for (let i = start; i <= limit; i++) {
    lifeMember.id += 1;
    _lifeMembers.push(lifeMember);
  }

  //Add list to lifeMembers Map
  _lifeMembers.map((lm) => {
    if (lm.lifeMembershipYear in lifeMembers) {
      lifeMembers[lm.lifeMembershipYear] = [lm];
    } else {
      lifeMembers[lm.lifeMembershipYear].push(lm);
    }
  });

  return [lifeMembers, limit];
}
