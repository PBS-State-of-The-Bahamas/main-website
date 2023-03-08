import React from "react";
import Facebook from "../icons/socials/Facebook";
import Instagram from "../icons/socials/Instagram";

type Props = {
  chapter: string;
  city: string;
  chapterType: string;
  country: string;
  imageURL: string;
};

const ChapterHero = ({
  chapter,
  city,
  chapterType,
  country,
  imageURL
}: Props) => {
  return (
    <div className="relative isolate overflow-hidden bg-royal-blue">
      <img
        src={imageURL}
        alt={`Phi Beta Sigma - ${chapter} Chapter`}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="px-6 lg:px-8">
        <div className="max-w-2xl py-32 sm:py-48 lg:py-56">
          <div>
            <h4 className="max-sm:text-sm text-heading-6 uppercase text-white">
              {chapterType} Chapter - {city}, {country}
            </h4>
            <h1 className="max-sm:text-3xl text-heading-1 font-bold uppercase text-white">
              {chapter}
            </h1>
          </div>
          <div className="py-4">
            <button className="bg-dark-royal-blue px-8 py-4 border-none rounded-sm uppercase text-gray-1 font-bold">
              I'm Interested
            </button>
          </div>
          <div className="py-4 flex flex-row">
            <div className="mr-8">
              <Facebook />
            </div>
            <div className="mr-8">
              <Instagram />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterHero;
