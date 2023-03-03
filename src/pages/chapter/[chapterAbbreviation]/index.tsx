import chapterPageActions from "@/api/modules/chapterPages/chapterPages";
import PageTemplate from "@/components/PageTemplate";
import CardsGrid from "@/components/cards/CardsGrid";
import ChapterHero from "@/components/hero/ChapterHero";
import Trophy from "@/components/icons/Trophy";
import GridGallery from "@/gallery/GridGallery";
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import React from "react";

export interface Chapter {
  name: string;
  type: string;
  chapterAbbreviation: string;
}

export interface ChapterAward {
  name: string;
  year: string;
  event: string;
}

export interface ChapterCharter {
  name: string;
  lineName: string;
  lineNumber: string;
}

export interface PageData {
  city: string;
  country: string;
  history: string;
  chapterAwards: ChapterAward[];
  chapterCharters: ChapterCharter[];
  chapterSocials: any;
  chapter: Chapter;
}
const images = [
  {
    source:
      "https://th.bing.com/th/id/R.93db2ad96c0408ab4d969fd2dee77249?rik=Xdp5c5P%2b80BQ2g&riu=http%3a%2f%2fphibetasigma1914.org%2fwp-content%2fuploads%2f2017%2f09%2ffounders%40Howard-e1508946425457.jpg&ehk=FJmuYFxrIZufj2uQrmlJysNLWkbJg5LFuSNkkTI2uaY%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    source:
      "https://th.bing.com/th/id/R.93db2ad96c0408ab4d969fd2dee77249?rik=Xdp5c5P%2b80BQ2g&riu=http%3a%2f%2fphibetasigma1914.org%2fwp-content%2fuploads%2f2017%2f09%2ffounders%40Howard-e1508946425457.jpg&ehk=FJmuYFxrIZufj2uQrmlJysNLWkbJg5LFuSNkkTI2uaY%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    source:
      "https://th.bing.com/th/id/R.93db2ad96c0408ab4d969fd2dee77249?rik=Xdp5c5P%2b80BQ2g&riu=http%3a%2f%2fphibetasigma1914.org%2fwp-content%2fuploads%2f2017%2f09%2ffounders%40Howard-e1508946425457.jpg&ehk=FJmuYFxrIZufj2uQrmlJysNLWkbJg5LFuSNkkTI2uaY%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    source:
      "https://th.bing.com/th/id/R.93db2ad96c0408ab4d969fd2dee77249?rik=Xdp5c5P%2b80BQ2g&riu=http%3a%2f%2fphibetasigma1914.org%2fwp-content%2fuploads%2f2017%2f09%2ffounders%40Howard-e1508946425457.jpg&ehk=FJmuYFxrIZufj2uQrmlJysNLWkbJg5LFuSNkkTI2uaY%3d&risl=&pid=ImgRaw&r=0",
  },
];
const Index: NextPage = ({ ...data }: PageData) => {
  const awards = data.chapterAwards.map((award: ChapterAward) => {
    return {
      icon: <Trophy />,
      title: award.name,
      subtitle: award.year,
      description: award.event,
    };
  });
  const charters = data.chapterCharters.map((charter: ChapterCharter) => {
    return {
      icon: <Trophy />,
      title: charter.name,
      subtitle: charter.lineNumber,
      description: charter.lineName,
    };
  });
  return (
    <PageTemplate pageType="chapter">
      <ChapterHero
        chapter={data.chapter.name}
        chapterType={data.chapter.type}
        city={data.city}
        country={data.country}
      />
      <div className="flex flex-col items-center lg:flex-row w-full">
        <div className="lg:w-3/6 p-8">
          <h4 className="text-heading-4 py-8 font-bold text-gray-6">History</h4>
          <img
            src="https://phibetasigma1914.org/wp-content/uploads/2017/09/founders@Howard-e1508946425457.jpg"
            alt=""
            className=""
          />
        </div>
        <div className="lg:w-3/6 p-8">
          <p>{data.history}</p>
        </div>
      </div>
      <CardsGrid heading="Founding Members" items={charters} />
      <CardsGrid heading="Awards" items={awards} />
      <GridGallery images={images} />
    </PageTemplate>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({
  query,
}): Promise<GetServerSidePropsResult<PageData>> => {
  const { chapterAbbreviation } = query;
  const [pageData, charters] = await Promise.all([
    chapterPageActions.getChapterPageByAbbreviation(
      (chapterAbbreviation as string).toUpperCase()
    ),
    chapterPageActions.getCharterMembers(
      (chapterAbbreviation as string).toUpperCase()
    ),
  ]);   
  if (pageData) {
    return {
      props: fromApiResponseToPageInterface(
        pageData?.data?.data[0]?.attributes,
        charters?.data?.data
      ),
    };
  }
  return {
    notFound: true,
  };
};

const fromApiResponseToPageInterface = (
  data: any,
  charterLine: any
): PageData => ({
  city: data?.city,
  country: data?.country,
  history: data?.history,
  chapterAwards: data?.chapter_awards?.data.map((award) =>
    fromApiResponseToChapterAwardInterface(award)
  ),
  chapterCharters: charterLine?.map((charter) =>
    fromApiResponseToChapterCharterInterface(charter)
  ),
  chapterSocials: data?.chapter_socials?.data[0]?.attributes,
  chapter: {
    name: data?.chapter?.data?.attributes?.name,
    type: data?.chapter?.data?.attributes?.type,
    chapterAbbreviation: data?.chapter?.data?.attributes?.chapter_abbreviation,
  },
});

const fromApiResponseToChapterAwardInterface = (award: any): ChapterAward => ({
  name: award?.attributes?.name,
  year: award?.attributes?.year,
  event: award?.attributes?.event,
});

const fromApiResponseToChapterCharterInterface = (
  charter: any
): ChapterCharter => ({
  name: charter?.attributes?.member?.data?.attributes?.name,
  lineName: charter?.attributes?.line_name,
  lineNumber: charter?.attributes?.line_number,
});
