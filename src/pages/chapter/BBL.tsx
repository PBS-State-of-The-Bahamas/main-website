import PageTemplate from "@/components/PageTemplate";
import CardsGrid from "@/components/cards/CardsGrid";
import ChapterHero from "@/components/hero/ChapterHero";
import Trophy from "@/components/icons/Trophy";
import GridGallery from "@/gallery/GridGallery";
import React from "react";

const awards = [
  {
    icon: <Trophy />,
    title: "Chapter of the Year",
    subtitle: "2019",
    description: "Bahamas State Conference",
  },
  {
    icon: <Trophy />,
    title: "Step Show Champions",
    subtitle: "2019",
    description: "Bahamas State Conference",
  },
  {
    icon: <Trophy />,
    title: "Chapter of the Year",
    subtitle: "2020",
    description: "Bahamas State Conference",
  },
  {
    icon: <Trophy />,
    title: "Chapter of the Year",
    subtitle: "2022",
    description: "Bahamas State Conference",
  },
];

const founders = [
  {
    icon: <Trophy />,
    title: "Ivorite L Scruggs",
    subtitle: "Subtitle",
  },
  {
    icon: <Trophy />,
    title: "Ivorite L Scruggs",
    subtitle: "Subtitle",
  },
  {
    icon: <Trophy />,
    title: "Ivorite L Scruggs",
    subtitle: "Subtitle",
  },
  {
    icon: <Trophy />,
    title: "Ivorite L Scruggs",
    subtitle: "Subtitle",
  },
  {
    icon: <Trophy />,
    title: "Ivorite L Scruggs",
    subtitle: "Subtitle",
  },
  {
    icon: <Trophy />,
    title: "Ivorite L Scruggs",
    subtitle: "Subtitle",
  },
];
const images = [
  {
    source:
      'https://th.bing.com/th/id/R.93db2ad96c0408ab4d969fd2dee77249?rik=Xdp5c5P%2b80BQ2g&riu=http%3a%2f%2fphibetasigma1914.org%2fwp-content%2fuploads%2f2017%2f09%2ffounders%40Howard-e1508946425457.jpg&ehk=FJmuYFxrIZufj2uQrmlJysNLWkbJg5LFuSNkkTI2uaY%3d&risl=&pid=ImgRaw&r=0',
  },
  {
    source:
      'https://th.bing.com/th/id/R.93db2ad96c0408ab4d969fd2dee77249?rik=Xdp5c5P%2b80BQ2g&riu=http%3a%2f%2fphibetasigma1914.org%2fwp-content%2fuploads%2f2017%2f09%2ffounders%40Howard-e1508946425457.jpg&ehk=FJmuYFxrIZufj2uQrmlJysNLWkbJg5LFuSNkkTI2uaY%3d&risl=&pid=ImgRaw&r=0',
  },
  {
    source:
      'https://th.bing.com/th/id/R.93db2ad96c0408ab4d969fd2dee77249?rik=Xdp5c5P%2b80BQ2g&riu=http%3a%2f%2fphibetasigma1914.org%2fwp-content%2fuploads%2f2017%2f09%2ffounders%40Howard-e1508946425457.jpg&ehk=FJmuYFxrIZufj2uQrmlJysNLWkbJg5LFuSNkkTI2uaY%3d&risl=&pid=ImgRaw&r=0',
  },
  {
    source:
      'https://th.bing.com/th/id/R.93db2ad96c0408ab4d969fd2dee77249?rik=Xdp5c5P%2b80BQ2g&riu=http%3a%2f%2fphibetasigma1914.org%2fwp-content%2fuploads%2f2017%2f09%2ffounders%40Howard-e1508946425457.jpg&ehk=FJmuYFxrIZufj2uQrmlJysNLWkbJg5LFuSNkkTI2uaY%3d&risl=&pid=ImgRaw&r=0',
  },
  {
    source:
      'https://th.bing.com/th/id/R.93db2ad96c0408ab4d969fd2dee77249?rik=Xdp5c5P%2b80BQ2g&riu=http%3a%2f%2fphibetasigma1914.org%2fwp-content%2fuploads%2f2017%2f09%2ffounders%40Howard-e1508946425457.jpg&ehk=FJmuYFxrIZufj2uQrmlJysNLWkbJg5LFuSNkkTI2uaY%3d&risl=&pid=ImgRaw&r=0',
  },
  {
    source:
      'https://th.bing.com/th/id/R.93db2ad96c0408ab4d969fd2dee77249?rik=Xdp5c5P%2b80BQ2g&riu=http%3a%2f%2fphibetasigma1914.org%2fwp-content%2fuploads%2f2017%2f09%2ffounders%40Howard-e1508946425457.jpg&ehk=FJmuYFxrIZufj2uQrmlJysNLWkbJg5LFuSNkkTI2uaY%3d&risl=&pid=ImgRaw&r=0',
  },
  {
    source:
      'https://th.bing.com/th/id/R.93db2ad96c0408ab4d969fd2dee77249?rik=Xdp5c5P%2b80BQ2g&riu=http%3a%2f%2fphibetasigma1914.org%2fwp-content%2fuploads%2f2017%2f09%2ffounders%40Howard-e1508946425457.jpg&ehk=FJmuYFxrIZufj2uQrmlJysNLWkbJg5LFuSNkkTI2uaY%3d&risl=&pid=ImgRaw&r=0',
  },
  {
    source:
      'https://th.bing.com/th/id/R.93db2ad96c0408ab4d969fd2dee77249?rik=Xdp5c5P%2b80BQ2g&riu=http%3a%2f%2fphibetasigma1914.org%2fwp-content%2fuploads%2f2017%2f09%2ffounders%40Howard-e1508946425457.jpg&ehk=FJmuYFxrIZufj2uQrmlJysNLWkbJg5LFuSNkkTI2uaY%3d&risl=&pid=ImgRaw&r=0',
  },
]
const Chapter = () => {
  return (
    <PageTemplate pageType="chapter">
      <ChapterHero
        chapter="Beta Beta Lambda"
        chapterType="Undergraduate"
        city="Nassau"
        country="Bahamas"
        buttonText="I'm Interested"
      />
      <div className="flex flex-col lg:flex-row w-full">
        <div className="lg:w-3/6 p-8">
          <h4 className="text-heading-4 py-8 max-lg:text-center font-bold text-gray-6">
            History
          </h4>
          <img
            src="https://phibetasigma1914.org/wp-content/uploads/2017/09/founders@Howard-e1508946425457.jpg"
            alt=""
            className="mx-auto"
          />
        </div>
        <div className="lg:w-3/6 p-8">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio
            pellentesque diam volutpat commodo. Mi tempus imperdiet nulla
            malesuada pellentesque elit eget. Pharetra et ultrices neque ornare
            aenean euismod. Libero enim sed faucibus turpis in. Eu consequat ac
            felis donec et odio. Id diam maecenas ultricies mi eget. Massa
            tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada
            proin. Dictum non consectetur a erat nam at lectus urna duis. Erat
            pellentesque adipiscing commodo elit at imperdiet dui accumsan sit.
            Eros in cursus turpis massa. Dui sapien eget mi proin sed. Dignissim
            cras tincidunt lobortis feugiat vivamus at augue eget. Eu consequat
            ac felis donec et odio pellentesque. Faucibus interdum posuere lorem
            ipsum dolor sit amet consectetur adipiscing. Tincidunt vitae semper
            quis lectus nulla at. In tellus integer feugiat scelerisque varius
            morbi enim nunc faucibus. Pellentesque id nibh tortor id aliquet.
            Enim ut sem viverra aliquet eget sit amet. Quis risus sed vulputate
            odio. Nisl tincidunt eget nullam non nisi est sit. Mattis
            ullamcorper velit sed ullamcorper. Etiam non quam lacus suspendisse
            faucibus interdum. Consequat id porta nibh venenatis cras sed felis
            eget velit. Adipiscing elit pellentesque habitant morbi tristique.
            Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare
            massa eget. Arcu risus quis varius quam quisque id diam vel.
            Vulputate ut pharetra sit amet aliquam. Curabitur gravida arcu ac
            tortor dignissim convallis aenean et.
          </p>
        </div>
      </div>
      <CardsGrid heading="Founding Members" items={founders} />
      <CardsGrid heading="Awards" items={awards} />
      <GridGallery images={images} />
    </PageTemplate>
  );
};

export default Chapter;
