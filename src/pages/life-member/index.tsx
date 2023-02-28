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
}: {
  lifeMembers: LifeMembers;
}) {
  Object.entries(lifeMembers).forEach(([key, value]) => {
    if (!value.length) {
      return <div>Life Members Not Found ...</div>;
    }
  });

  return (
    <div>
      <Head>
        <title>Life Members</title>
      </Head>
      <PageTemplate>
        <div className="min-h-screen">
          <div className="text-heading-3 pt-12">Sigma Bahamas Life Members</div>
          <div className="pt-2 pb-6">
            Lorem ipsum dolor sit amet consectetur. Hendrerit diam quis
            ultricies scelerisque eget et et scelerisque. Nunc aliquam morbi
            suscipit at sagittis. Adipiscing id at mauris ut odio dictum
            ultricies vitae neque. Risus arcu lectus enim egestas urna. Massa
            platea neque integer diam. Commodo magna sodales sagittis quisque
            turpis dictumst. In donec integer elit malesuada a imperdiet vel
            amet.
          </div>
          {Object.keys(lifeMembers).map((year) => {
            return (
              <div className="pt-2">
                <div className="text-heading-4">{year}</div>
                <div className="mt-4 grid md:grid-cols-4 md:gap-4 gap-y-4">
                  {lifeMembers[year].map((lifeMember: LifeMember) => {
                    return (
                      <Member
                        key={lifeMember.id}
                        memberName={lifeMember.memberName}
                        memberPhotoUrl={lifeMember.memberPhotoUrl}
                      >
                        <LifeMember
                          key={v4()}
                          shipName={lifeMember.description.shipName}
                          lineName={lifeMember.description.lineName}
                        />
                      </Member>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </PageTemplate>
    </div>
  );
}

export interface LifeMembers {
  [year: string]: LifeMember[];
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
}> = async () => {
  const lifeMembers = getLifeMembers(1, 25);
  return { props: { lifeMembers } };
};

function getLifeMembers(start: number, limit: number): LifeMembers {
  let lifeMembers: LifeMembers = {};

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
      lifeMembers[lm.lifeMembershipYear].push(lm);
    } else {
      lifeMembers[lm.lifeMembershipYear] = [lm];
    }
  });

  return lifeMembers;
}
