import { Button, Stack } from "@mui/material";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { MoviesDataState, MoviesState } from "src/atom/MovieState";
import { Movies } from "src/type";
import { MovieUrl } from "src/utils/movies";

type Props = {
  comingSoon: Movies[];
};

const BackImage: FC<Props> = ({ comingSoon }) => {
  const [open, setOpen] = useRecoilState(MoviesState);
  const [movie, setMovi] = useState<Movies | null>(null);
  const [movies, setMovies] = useRecoilState(MoviesDataState);

  useEffect(() => {
    setMovi(comingSoon[Math.floor(Math.random() * comingSoon.length)]);
  }, [comingSoon]);
  return (
    <div className="flex flex-col justify-center  h-[65vh] pl-10">
      <div className=" top-0 left-0 -z-10 absolute h-screen w-screen">
        <Image
          layout="fill"
          src={`${MovieUrl}${movie?.backdrop_path || movie?.poster_path}`}
          objectFit="cover"
          alt="ss"
        />
      </div>

      <h1 className="  text-xl  md:text-2xl ">
        {movie?.title || movie?.original_title}
      </h1>
      <p className="text-sm md:text-md  max-w-sm md:max-w-lg  lg:max-w-xl">
        {movie?.overview}
      </p>
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          className="font-bold text-xl mt-4 "
          onClick={() => setOpen(true)}
        >
          再生
        </Button>
      </Stack>
    </div>
  );
};

export default BackImage;
