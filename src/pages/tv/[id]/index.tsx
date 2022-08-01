import { Pagination, Stack } from "@mui/material";

import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { MoviesDataState, MoviesState } from "src/atom/MovieState";
import { Movies } from "src/type";
import { NextPage } from "next";
import { useRouter } from "next/router";
import TvIds from "src/components/TV";
import TvMap from "src/components/TV/TvMap";

const Tvmovies: NextPage = () => {
  const TV = useRecoilValue(MoviesState);

  const [movies, setMovies] = useRecoilState(MoviesDataState);
  const [container, setContainer] = useState<Movies[]>([]);
  const [page, setpage] = useState(1);
  const router = useRouter();
  const [open, setOpen] = useRecoilState(MoviesState);

  // TVのデータを取得し、ページ遷移するごとにTVapiが持っているpageが動的に変化
  useEffect(() => {
    const TVapi = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ja&sort_by=popularity.desc&include_video=false&page=${page}`
      );
      const res = await data.json();
      console.log(res);

      setContainer(res.results);
    };
    TVapi();
  }, [page]);

  return (
    <div>
      <div className="relative top-16  grid  gap-2  sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-5  ">
        {container.map((tv) => (
          <TvMap key={tv.id} tv={tv} />
        ))}
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
      {TV && <TvIds />}
    </div>
  );
};

export default Tvmovies;
