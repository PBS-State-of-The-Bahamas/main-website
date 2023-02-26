import PageTemplate from "@/components/PageTemplate";
import { GetServerSideProps } from "next";
import Head from "next/head";

export default function LifeMember() {
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
          <div className="grid grid-cols-1 gap-4">
            <div></div>
          </div>
        </div>
      </PageTemplate>
    </div>
  );
}

export interface LifeMember {
  memberName: string;
  memberPhotoURL: string;
  shipName: string;
  lineName: string;
}

function getLifeMembers() {}

export const getServerSideProps: GetServerSideProps<{
  resp: string;
}> = async () => {
  const resp = "";
  return { props: { resp } };
};
