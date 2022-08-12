import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { MoviesState } from "src/atom/MovieState";
import { Movies } from "src/type";
import { NextPage } from "next";
import { useRouter } from "next/router";
import TvMap from "src/components/TV/TvMap";
import { Toaster } from "react-hot-toast";
import Meta from "src/components/Meta";
import { Pagination } from "@mantine/core";
import Modals from "src/components/Modal";

const Tvmovies: NextPage = () => {
  const TV = useRecoilValue(MoviesState);

  const [page, setpage] = useState(1);
  const router = useRouter();

  const [show, setShow] = useState<Movies[]>([]);

  // TVのデータを取得し、ページ遷移するごとにTVapiが持っているpageが動的に変化
  useEffect(() => {
    const TVapi = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ja&timezone=Java&sort_by=popularity.desc&include_video=false&page=${page}`
      );
      const res = await data.json();

      setShow(res.results);
    };
    TVapi();
  }, [page]);

  return (
    <div>
      <Meta title="ドラマを見よう" />
      <div className="relative top-10">
        <div className="relative top-16  TVgrid ">
          {show.map((tv) => (
            <TvMap key={tv.id} tv={tv} />
          ))}
        </div>
        <div className="mt-14">
          <Pagination
            total={20}
            siblings={2}
            initialPage={1}
            className="  flex justify-center py-4 "
            color="red"
            onChange={(page) => {
              setpage(page);
              router.push(`/tv/${page}`);
            }}
          />
        </div>
        <Toaster position="top-center" reverseOrder={false} />
        {TV && <Modals />}
      </div>
    </div>
  );
};

export default Tvmovies;
