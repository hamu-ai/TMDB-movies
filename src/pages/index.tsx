import type { NextPage } from "next";
import Head from "next/head";
import BackImage from "src/components/BackImage";
import Heder from "src/components/Heder";
import Moviemain from "src/components/Moviemain";
import { Movies } from "src/type";
import { response } from "src/utils";

type Props = {
  comingSoon: Movies[];
  TopRating: Movies[];
  popular: Movies[];
};

const Home: NextPage<Props> = ({ comingSoon, TopRating, popular }) => {
  console.log(comingSoon);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <BackImage comingSoon={comingSoon} />
        <article className="">
          <Moviemain title={"近日公開"} movie={comingSoon} />
          <Moviemain title={"トップ評価"} movie={TopRating} />
          <Moviemain title={"人気"} movie={popular} />
        </article>
      </main>
    </div>
  );
};

export const getServerSideProps = async () => {
  const [comingSoon, TopRating, popular] = await Promise.all([
    fetch(response.fetchcomingSoon).then((res) => res.json()),
    fetch(response.fetchTopRating).then((res) => res.json()),
    fetch(response.fetchpopular).then((res) => res.json()),
  ]);

  return {
    props: {
      comingSoon: comingSoon.results,
      TopRating: TopRating.results,
      popular: popular.results,
    },
  };
};

export default Home;
