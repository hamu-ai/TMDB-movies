import type { NextPage } from "next";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { MoviesState } from "src/atom/MovieState";
import BackImage from "src/components/BackImage";
import Meta from "src/components/Meta";
import Modals from "src/components/Modal";
import Moviemain from "src/components/Moviemain";
import { Movies } from "src/type";
import { response } from "src/utils";

type Props = {
  comingSoon: Movies[];
  comingSoon2: Movies[];
  TopRating: Movies[];
  popular: Movies[];
  fetchtrend: Movies[];
};

const Home: NextPage<Props> = ({
  comingSoon,
  comingSoon2,
  TopRating,
  popular,
  fetchtrend,
}) => {
  //　モーダルを開くたびにレンダリングさせる
  const movieModal = useRecoilValue(MoviesState);

  return (
    <div>
      <Meta
        title="映画を見よう！"
        keywords="映画,TV"
        description="映画やドラマの動画が見えます。"
      />
      <Toaster position="top-center" reverseOrder={false} />
      <BackImage comingSoon={comingSoon} />

      <Moviemain title={"近日公開予定"} movie={comingSoon} />
      <Moviemain movie={comingSoon2} />
      <Moviemain title={"トップ評価"} movie={TopRating} />
      <Moviemain title={"人気"} movie={popular} />
      <Moviemain title={"トレンド"} movie={fetchtrend} />

      {movieModal && <Modals />}
    </div>
  );
};

export const getServerSideProps = async () => {
  const [comingSoon, TopRating, popular, fetchtrend, comingSoon2] =
    await Promise.all([
      fetch(response.fetchcomingSoon).then((res) => res.json()),
      fetch(response.fetchcomingSoon2).then((res) => res.json()),
      fetch(response.fetchTopRating).then((res) => res.json()),
      fetch(response.fetchpopular).then((res) => res.json()),
      fetch(response.fetchtrend).then((res) => res.json()),
    ]);

  return {
    props: {
      comingSoon: comingSoon.results,
      comingSoon2: comingSoon2.results,
      TopRating: TopRating.results,
      popular: popular.results,
      fetchtrend: fetchtrend.results,
    },
  };
};

export default Home;
