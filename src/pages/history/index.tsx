import getHistory from "@/api/modules/history/getHistory";
import PageTemplate from "@/components/PageTemplate";
import { GetServerSideProps } from "next";
import Head from "next/head";

export default function History( {
   history,
}: {
  history: string;
}) {
  const notFound = <div>History Not Found ...</div>

  if(!history) {
    return notFound
  }

  return (
    <div>
      <Head>
        <title>History</title>
      </Head>
      <PageTemplate>
        <div className="min-h-screen">
          <div className="text-heading-3 pt-12 pl-72 text-left font-inter">History of state</div>
          <div className="p-72 pt-2 text-[16px]text-justify font-inter whitespace-pre-line">
            {history}
          </div>
        </div>
      </PageTemplate>
    </div>
  );
}

async function getHistoryinfo(): Promise<string>{
  const [history, error] = await getHistory();
  if (error) {
    return error;
  }

  return history?.data?.data?.attributes?.history
} 

export interface History {
  history: string;
}

export const getServerSideProps: GetServerSideProps<{
  history: string;
}> = async () =>{
  const history = await Promise.resolve(getHistoryinfo());
  return {props: {history}};
};