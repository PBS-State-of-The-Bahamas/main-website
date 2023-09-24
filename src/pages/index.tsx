import Head from "next/head";
import PageTemplate from "@/components/PageTemplate";
import Container from "@/components/Container";
import ProgramCard from "@/components/cards/ProgramCard";
import Section from "@/components/Section";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [countUp, setCountUp] = useState(0);

  const keyDownEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "ArrowUp") {
      setCountUp(() => countUp + 1);
    }
  };

  const landingPage = (
    <Section>
      <div
        className="min-h-screen w-screen bg-royal-blue grid place-items-center"
        onKeyDown={keyDownEvent}
        tabIndex={0}
      >
        <h1 className="text-heading-1  text-gray-1 ">COMING SOON</h1>
      </div>
    </Section>
  );

  if (countUp < 3) {
    return landingPage;
  }

  return (
    <div>
      <Head>
        <title>Phi Beta Sigma: The Bahamas</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTemplate>
        <HomepageHeaderSection />
        <AboutSection />
        <MissionSection />
        <PBSProgramSection />
      </PageTemplate>
    </div>
  );
}
const HomepageHeaderSection = () => {
  return (
    <header className="bg-[url('/images/Blue-white-meetup.png')] bg-cover lg: bg-center lg:bg-[center_top_-15rem]">
      <div className='bg-royal-blue/30 backdrop-brightness-50 h-full w-full pt-12 pb-40'>
      <Container>
        <h1 className="text-heading-1 text-pure-white">
          Brotherhood. <br />
          Scholarship. <br />
          Service.
        </h1>
      </Container>
      </div>
    </header>
  )
}

const AboutSection = () => {
  return (
    <Section>
    <div className="gap-x-6 flex flex-col-reverse lg:flex-row">
      <div className="lg:w-1/2 w-full">
        <h4 className="text-heading-4 text-gray-6 mt-4 lg:mt-0">About</h4>
        <p className="text-gray-5 pt-1">
          Over the years, Phi Beta Sigma Fraternity Inc. has expanded its reach to several countries, including the Bahamas. The Bahamas State of Phi Beta Sigma Fraternity Inc. is an integral component of the fraternity, and it has been making significant contributions to the local community since it became a state in 2004.
          <br />
          <br />
          The Bahamas became a state of Phi Beta Sigma Fraternity Inc. in 2004 with the chartering of the Beta Beta Lambda Chapter at the now University of The Bahamas, joined the Delta Epsilon Sigma Chapter in Nassau, Bahamas. The addition of this chapter brought new energy to the fraternity, and it paved the way for the addition of more chapters in the country. The Omicron Pi Sigma Chapter in Freeport, Grand Bahama was subsequently added to the state. With these three chapters, the state of the Bahamas has become a significant part of the global Phi Beta Sigma Fraternity Inc. community.
          <br />
          <br />
          The state of the Bahamas has a strong commitment to promoting academic excellence, leadership, and community service. The fraternity offers several scholarships to students in the Bahamas who are pursuing higher education, and it provides mentoring and tutoring services to help them achieve their academic goals. The fraternity is also involved in several community service initiatives, partnering with local organizations to provide assistance to those in need.
        </p>
        <Link
          href="https://phibetasigma1914.org/about/history/"
          target="_blank"
          className="cursor-pointer"
        >
          <button className="cursor-pointer rounded bg-royal-blue text-heading-6 text-gray-1 py-2 px-6 uppercase mt-6">
            Learn more{" "}
          </button>
        </Link>
      </div>
      <div className="grow w-auto">
        <img
          src={"/images/sigma-community.jpg"}
          alt="Our mission"
          className="h-full max-h-96 mx-auto w-full"
        />
      </div>
    </div>
  </Section>
  )
}

const MissionSection = () => {
  return (
    <Section classes="bg-gray-2">
    <div className="gap-x-6 flex lg:flex-row flex-col flex-1">
      <div className="grow w-auto">
        <img
          src={"/images/sigma-mission.png"}
          alt="Our mission"
          className="h-full mx-auto max-h-96 w-full"
        />
      </div>
      <div className="lg:w-1/2 w-full">
        <h4 className="text-heading-4 text-gray-6 lg:mt-0 mt-4">
          Our mission
        </h4>
        <p className="text-gray-5 pt-1">
          One of the key objectives of the state of the Bahamas is to expand the fraternity throughout the other islands in the country. This expansion will help to promote the fraternity&apos;s values and make a positive impact in communities across the country.
          <br />
          <br />
            The state of the Bahamas has been led by several dedicated state directors over the years. Tyro Brice, Gerrard Sawyer, Christopher Saunders, Wellington Ferguson, and Rodney Bain have all made significant contributions to the fraternity&apos;s growth and development in the country. These leaders have helped to promote the fraternity&apos;s values and have encouraged its members to take an active role in their communities.
          <br />
          <br />
            The state of the Bahamas of Phi Beta Sigma Fraternity Inc. is an important part of the fraternity&apos;s global community. The fraternity&apos;s commitment to education, community service, and leadership has made a significant impact in the Bahamas. The state&apos;s three chapters and its dedicated leaders have worked tirelessly to promote the fraternity&apos;s values and make a positive impact in the community. The state of the Bahamas is looking to expand the fraternity&apos;s reach throughout the country, and its efforts will undoubtedly have a lasting impact on communities across the country.
        </p>
        <Link
          href="/history/"
          className="cursor-pointer"
        >
          <button className="cursor-pointer rounded bg-royal-blue text-heading-6 text-gray-1 py-2 px-6 uppercase mt-6">
            Learn more
          </button>
        </Link>
      </div>
    </div>
  </Section>
  )
}
const PBSProgramSection = () => {
  return (
    <section className="py-12 bg-[#E7EFFF]">
      <Container>
        <div className="flex gap-4 flex-wrap w-full flex-col lg:flex-row">
          <div className='flex flex-1 gap-x-4 flex-col md:flex-row'>
            <ProgramCard title="Bigger Better Business" photoUrl="/images/sigma-bigger-better-business.jpeg" />
            <ProgramCard title="Education" photoUrl="/images/sigma-education.jpeg" />
          </div>
          <div className='flex flex-1 gap-x-4 flex-col md:flex-row '>
            <ProgramCard title="Social Action" photoUrl="/images/sigma-social-action.jpeg" />
            <ProgramCard title="Sigma Beta Club" photoUrl="/images/sigma-beta.jpeg" />            
          </div>
        </div>
      </Container>
    </section>
  )
}