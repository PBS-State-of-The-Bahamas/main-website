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

export interface ChapterImage {
  source: string;
}

export interface ChapterSocial {
  platform: string;
  profileURL: string;
}

export interface PageData {
  city: string;
  country: string;
  history: string;
  chapterAwards: ChapterAward[];
  chapterCharters: ChapterCharter[];
  images: ChapterImage[];
  chapterSocials: ChapterSocial[];
  chapter: Chapter;
}

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
  const images = data.images.map((image: ChapterImage) => {
    return {
      source: `${process.env.NEXT_PUBLIC_API_URL}${image.source}`,
    };
  });

  return (
    <PageTemplate pageType="chapter">
      <ChapterHero
        chapter={data.chapter.name}
        chapterType={data.chapter.type}
        city={data.city}
        country={data.country}
        imageURL={images[Math.floor(Math.random() * images.length)].source}
      />
      <div className="flex flex-col items-center lg:flex-row w-full">
        <div className="lg:w-3/6 p-8">
          <h4 className="text-heading-4 py-8 font-bold text-gray-6">History</h4>
          <img
            src={images[Math.floor(Math.random() * images.length)].source}
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
  if (pageData?.data?.data[0]?.attributes && charters?.data?.data) {
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
  chapterSocials: data?.chapter_socials?.data.map((social) =>
    fromApiResponseToChapterSocialsInterface(social)
  ),
  chapter: {
    name: data?.chapter?.data?.attributes?.name,
    type: data?.chapter?.data?.attributes?.type,
    chapterAbbreviation: data?.chapter?.data?.attributes?.chapter_abbreviation,
  },
  images: data?.gallery_images?.data?.map((image) =>
    fromApiResponseToChapterGalleryInterface(image)
  ),
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

const fromApiResponseToChapterGalleryInterface = (
  gallery: any
): ChapterImage => ({
  source: gallery?.attributes?.url,
});

const fromApiResponseToChapterSocialsInterface = (
  social: any
): ChapterSocial => ({
  platform: social?.attributes?.platform,
  profileURL: social?.attributes?.link,
});
