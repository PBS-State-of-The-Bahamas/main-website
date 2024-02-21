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
  const notFound = <DataNotFound />

  if(!history) {
    return notFound
  }
  const historyParagraphs = history.split("\n");

  // Replace occurrences of **Text** with the corresponding bolded React component
  const formattedParagraphs = historyParagraphs.map(
    (paragraph, paragraphIndex) => {
      const formattedText = paragraph
        .split(/\*\*(.*?)\*\*/g)
        .map((segment, index) => {
          return index % 2 === 0 ? (
            segment
          ) : (
            <strong key={index}>{segment}</strong>
          );
        });

      return <p key={paragraphIndex}>{formattedText}</p>;
    }
  );
  return (
    <div>
      <Head>
        <title>History</title>
      </Head>
      <PageTemplate>
        <Section>
          <div>
              <h3 className="text-heading-3">History of state</h3>
                <div className="space-y-4 pt-2 text-gray-5">
                  {formattedParagraphs}
                </div>
          </div>
        </Section>
      </PageTemplate>
    </div>
  );
}

async function getHistoryinfo(): Promise<string>{
  const [history, error] = await getHistory();
  if (error) {
    console.log(error)
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