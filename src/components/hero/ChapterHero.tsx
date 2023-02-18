import React from "react";

type ChapterHeroInfo = {
  chapter: string;
  city: string;
  chapterType: "Undergraduate" | "Graduate";
  country: string;
};

const ChapterHero = ({ chapter, city, chapterType, country }: ChapterHeroInfo) => {
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
            <h4 className="max-sm:text-sm text-xl text-white">
              {chapterType} Chapter - {city}, {country}
            </h4>
            <h1 className="max-sm:text-3xl text-6xl font-bold text-white">
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
