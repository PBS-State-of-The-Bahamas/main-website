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
        <section className="min-h-screen mx-24">
          <h3 className="text-heading-3 pt-12 text-left font-open-sans">History of state</h3>
          <div className=" pt-2 text-justify font-open-sans whitespace-pre-line">
            {history}
          </div>
        </section>
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