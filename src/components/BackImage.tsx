import { Button } from "@mantine/core";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { MoviesDataState, MoviesState } from "src/atom/MovieState";
import { Movies } from "src/type";
import { MovieUrl } from "src/utils/movies";

type Props = {
  comingSoon: Movies[];
};

const BackImage: FC<Props> = ({ comingSoon }) => {
  const setOpen = useSetRecoilState(MoviesState);
  const [movieData, setMovieData] = useState<Movies | null>(null);
  const setMovies = useSetRecoilState(MoviesDataState);

  useEffect(() => {
    setMovieData(comingSoon[Math.floor(Math.random() * comingSoon.length)]);
  }, [comingSoon]);
  return (
    <div className="flex flex-col justify-center  h-[65vh] pl-4">
      <div className=" top-0 left-0 -z-10 absolute h-screen w-screen">
        <Image
          layout="fill"
          src={`${MovieUrl}${
            movieData?.backdrop_path || movieData?.poster_path
          }`}
          objectFit="cover"
          alt="error"
        />
      </div>
      <div className="text-white">
        <h1 className="text-xl md:text-2xl">
          {movieData?.title || movieData?.original_title}
        </h1>
        <p className="text-sm md:text-md  max-w-md  md:max-w-lg  lg:max-w-xl">
          {movieData?.overview}
        </p>
      </div>
      <div>
        <Button
          className=" text-xl mt-4 "
          onClick={() => {
            setOpen(true);
            setMovies(movieData);
          }}
        >
          再生
        </Button>
      </div>
    </div>
  );
};

export default BackImage;
