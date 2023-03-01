import getLifeMembers from "@/api/modules/lifeMember/getLifeMembers";
import LineMember, { LineMemberProps } from "@/components/lineage/line_member";
import Member from "@/components/member/member";
import PageTemplate from "@/components/PageTemplate";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { v4 } from "uuid";

export default function LifeMembers({
  lifeMembers,
}: {
  lifeMembers: LifeMembers;
}) {
  const notFound =  <div>Life Members Not Found ...</div>;

  if (!lifeMembers){
    return notFound
  }

  Object.entries(lifeMembers).forEach(([key, value]) => {
    if (!value.length) {
      return notFound
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
                        <LineMember
                          key={lifeMember.description.id}
                          id={lifeMember.description.id}
                          lineNumber={lifeMember.description.lineNumber}
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
  description: LineMemberProps;
}

export const getServerSideProps: GetServerSideProps<{
  lifeMembers: LifeMembers;
}> = async () => {
  const lifeMembers = await _getLifeMembers();
  return { props: { lifeMembers } };
};

async function _getLifeMembers(): Promise<LifeMembers> {
  let lifeMembers: LifeMembers = {};

  const [jsonLifeMembers, error] = await getLifeMembers();

  if (error) {
    console.log(error);
    return jsonLifeMembers;
  }

  jsonLifeMembers?.data?.data?.map((lifeMember) => {
    let lm: LifeMember = {
      id: lifeMember?.id,
      memberName: lifeMember?.attributes?.name,
      memberPhotoUrl: lifeMember?.attributes?.photo?.data?.length
        ? `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}${lifeMember?.attributes?.photo?.data[0].attributes?.formats?.small?.url}`
        : "/images/missing-member.svg",
      lifeMembershipYear: lifeMember?.attributes?.life_membership_year,
      description: {
        id: v4(),
        lineNumber:
          lifeMember?.attributes?.line_member?.data !== null
            ? lifeMember?.attributes?.line_member?.data?.attributes?.line_number
            : null,
        lineName:
          lifeMember?.attributes?.line_member?.data !== null
            ? lifeMember?.attributes?.line_member?.data?.attributes?.line_name
            : null,
      },
    };

    if (lm.lifeMembershipYear in lifeMembers) {
      lifeMembers[lm.lifeMembershipYear].push(lm);
    } else {
      lifeMembers[lm.lifeMembershipYear] = [lm];
    }
  });

  return lifeMembers;
}
