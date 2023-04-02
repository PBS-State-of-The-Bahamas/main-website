import React from "react";
import Facebook from "../icons/socials/Facebook";
import Instagram from "../icons/socials/Instagram";
import { ChapterSocial } from "@/pages/chapter/[chapterAbbreviation]";
import Link from "next/link";

type Props = {
  chapter: string;
  city: string;
  chapterType: string;
  country: string;
  imageURL: string;
  socials: ChapterSocial[];
};

const socialIcons = {
  facebook: <Facebook />,
  instagram: <Instagram />,
};

const ChapterHero = ({
  chapter,
  city,
  chapterType,
  country,
  imageURL,
  socials,
}: Props) => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-4">
      <img
        src={imageURL}
        alt={`Phi Beta Sigma - ${chapter} Chapter`}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="px-6 lg:px-8">
        <div className="max-w-2xl py-32 sm:py-48 lg:pt-16 lg:pb-32">
          <div>
            <h4 className="max-sm:text-sm text-heading-6 uppercase text-white">
              {chapterType} Chapter - {city}, {country}
            </h4>
            <h1 className="max-sm:text-3xl text-heading-1 font-bold uppercase text-white">
              {chapter}
            </h1>
          </div>
          <div className="py-4">
            <button className="bg-royal-blue px-6 py-3 border-none rounded-sm uppercase text-gray-1 font-bold">
              {"I'm Interested"}
            </button>
          </div>
          <div className="py-4 flex flex-row">
            {socials.map((social) => (
              <div key={social.platform} className="mr-2">
                {socialIcons[social.platform] && (
                  <Link href={social.profileURL}>
                    {socialIcons[social.platform]}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterHero;
