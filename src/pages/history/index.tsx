import getHistory from "@/api/modules/history/getHistory";
import PageTemplate from "@/components/PageTemplate";
import Section from "@/components/Section";
import { GetServerSideProps } from "next";
import Head from "next/head";
import DataNotFound from "@/components/DataNotFound";

export default function History( {
   history,
}: {
  history: string;
}) {
  const notFound = DataNotFound(history);

  if(!history) {
    return notFound;
  }

  return (
    <div>
      <Head>
        <title>History</title>
      </Head>
      <PageTemplate>
        <Section>
          <div>
              <h3 className="text-heading-3 pt-6 font-open-sans">History of state</h3>
                <p className=" pt-2 text-justify font-open-sans whitespace-pre-line">
                  {history}
                </p>
          </div>
        </Section>
      </PageTemplate>
    </div>
  );
}

async function getHistoryinfo(): Promise<string>{
  const [history, error] = await getHistory();
  if (error) {
    console.log(error);
    return history;
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