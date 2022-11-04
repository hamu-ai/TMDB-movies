import { Pagination } from "@mantine/core";
import { useRouter } from "next/router";
import { FC, Suspense, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { MoviesState } from "src/atom/MovieState";
import { Movies, MoviesData } from "src/type";

import Meta from "../Meta";
import Modals from "../Modal";
import TvMap from "./TvMap";

const TvPage: FC = () => {
  const TV = useRecoilValue(MoviesState);
  const [page, setpage] = useState(1);
  const router = useRouter();
  const [tvData, setTvData] = useState<Movies[]>([]);

  // TVのデータを取得し、ページ遷移するごとにTVapiが持っているpageが動的に変化
  useEffect(() => {
    try {
      const TVapi = async () => {
        const data = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ja&timezone=Java&sort_by=popularity.desc&include_video=false&page=${page}`
        );
        const res: MoviesData = await data.json();

        setTvData(res.results);
      };
      TVapi();
    } catch (error) {
      console.log(error);
    }
  }, [page]);
  return (
    <div>
      <Meta title="ドラマを見よう" />
      <div className="relative top-10">
        <Suspense fallback={<p>Loading...</p>}>
          <div className="relative top-16  TVgrid ">
            {tvData.map((tv) => (
              <TvMap key={tv.id} tv={tv} />
            ))}
          </div>
        </Suspense>
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

export default TvPage;
