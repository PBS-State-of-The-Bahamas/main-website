import chapterPageActions from "@/api/modules/chapterPages/chapterPages";
import PageTemplate from "@/components/PageTemplate";
import CardsGrid from "@/components/cards/CardsGrid";
import ChapterHero from "@/components/hero/ChapterHero";
import Trophy from "@/components/icons/Trophy";
import LineMember from "@/components/lineage/line_member";
import Member from "@/components/member/member";
import GridGallery from "@/components/gallery/GridGallery";
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import React from "react";
import ChapterInterestForm from "@/components/forms/ChapterInterestForm";
import Head from "next/head";
import Image from "next/image";

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
  imageURL: string;
}

export interface ChapterImage {
  source: string;
  altText: string;
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
      imageURL: charter.imageURL,
    };
  });
  const images = data.images.map((image: ChapterImage) => {
    return {
      source: `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOST}${process.env.NEXT_PUBLIC_API_PORT}${image.source}`,
      altText: image.altText,
    };
  });
  const imageIndex = Math.floor(Math.random() * images.length);
  const socials = data.chapterSocials.map((social: ChapterSocial) => {
    return {
      platform: social.platform,
      profileURL: social.profileURL,
    };
  });
  const historyParagraphs = data.history.split("\n");

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
    <>
      <Head>
        <title>{data.chapter.name} Chapter</title>
      </Head>
      <PageTemplate>
        <ChapterHero
          chapter={data.chapter.name}
          chapterType={data.chapter.type}
          city={data.city}
          country={data.country}
          imageURL={images[Math.floor(Math.random() * images.length)].source}
          socials={socials}
        />
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto flex flex-col items-start lg:mx-0 lg:max-w-none lg:flex-row">
            <div className="w-full lg:flex-auto">
              <h4 className="text-heading-4 tracking-wider pb-8 font-bold text-gray-6">
                Chapter History
              </h4>
              <Image
                src={images[imageIndex].source}
                alt={images[imageIndex].altText}
                width={400}
                height={300}
                className="object-fit w-[400px] h-[300px]"
              />
            </div>
            <div className="w-full text-sm lg:text-base lg:flex-auto mt-8 lg:mt-0 space-y-2">
              {formattedParagraphs}
            </div>
          </div>
        </div>
        <div>
          {charters?.length > 0 && (
            <>
              <div className="m-8">
                <h4 className="text-heading-4 font-bold text-gray-6">
                  Charters
                </h4>
              </div>
              <div className="m-8 grid gap-5 max-sm:grid-cols-1 max-sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                {charters.map((charter, idx) => (
                  <Member
                    key={charter.title}
                    memberName={charter.title}
                    memberPhotoUrl={charter.imageURL}
                  >
                    <LineMember
                      key={charter.title}
                      id={idx}
                      lineNumber={parseInt(charter.subtitle)}
                      lineName={charter.description}
                    />
                  </Member>
                ))}
              </div>
            </>
          )}
        </div>
        {awards?.length > 0 && <CardsGrid heading="Awards" items={awards} />}
        <GridGallery images={images} />
        <ChapterInterestForm
          chapter={data.chapter.chapterAbbreviation?.toUpperCase()}
          chapterType={data.chapter.type?.toLowerCase()}
        />
      </PageTemplate>
    </>
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
  imageURL: charter?.attributes?.member?.data?.attributes?.photo?.data?.[0]
    ?.attributes?.formats?.small?.url
    ? `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOST}${process.env.NEXT_PUBLIC_API_PORT}${charter?.attributes?.member?.data?.attributes?.photo?.data[0]?.attributes?.formats?.small?.url}`
    : "/images/missing-member.svg",
});

const fromApiResponseToChapterGalleryInterface = (
  gallery: any
): ChapterImage => ({
  source: gallery?.attributes?.url,
  altText: gallery?.attributes?.alternativeText,
});

const fromApiResponseToChapterSocialsInterface = (
  social: any
): ChapterSocial => ({
  platform: social?.attributes?.platform,
  profileURL: social?.attributes?.link,
});
