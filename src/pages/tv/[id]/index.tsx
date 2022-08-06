import { Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { MoviesState } from "src/atom/MovieState";
import { Movies } from "src/type";
import { NextPage } from "next";
import { useRouter } from "next/router";
import TvIds from "src/components/TV";
import TvMap from "src/components/TV/TvMap";
import { Toaster } from "react-hot-toast";

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
    <div className="h-[95vh]">
      <div className="relative top-10">
        <div className="relative top-16  TVgrid ">
          {show.map((tv) => (
            <TvMap key={tv.id} tv={tv} />
          ))}
        </div>
        <div className="mt-14">
          <Stack spacing={2}>
            <Pagination
              count={20}
              showFirstButton
              showLastButton
              color="primary"
              className=" w-screen flex justify-center py-4 bg-red-600"
              onChange={(e, page) => {
                setpage(page);
                router.push(`/tv/${page}`);
              }}
            />
          </Stack>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
        {TV && <TvIds />}
      </div>
    </div>
  );
};

export default Tvmovies;
