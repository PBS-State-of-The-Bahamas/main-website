import React from "react";

type Props = {
  chapter: string;
  city: string;
  chapterType: "Undergraduate" | "Graduate";
  country: string;
};

const ChapterHero = ({ chapter, city, chapterType, country }: Props) => {
  return (
    <div className="relative isolate overflow-hidden bg-royal-blue">
      <img
        src=""
        alt={`Phi Beta Sigma - ${chapter} Chapter`}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="px-6 lg:px-8">
        <div className="max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-left">
            <h4 className="max-sm:text-sm text-heading-6 uppercase text-white">
              {chapterType} Chapter - {city}, {country}
            </h4>
            <h1 className="max-sm:text-3xl text-heading-1 font-bold uppercase text-white">
              {chapter}
            </h1>
          </div>
          <div>{/* TODO: add interest button and social links */}</div>
        </div>
      </div>
    </div>
  );
};

export default ChapterHero;
