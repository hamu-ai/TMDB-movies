import { FC } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { MoviesDataState, MoviesState } from "src/atom/MovieState";
import { Movies } from "src/type";

type Props = {
  tv: Movies;
};

const TvMap: FC<Props> = ({ tv }) => {
  const [movies, setMovies] = useRecoilState(MoviesDataState);
  const [open, setOpen] = useRecoilState(MoviesState);
  return (
    <div
      onClick={() => {
        setMovies(tv);
        setOpen(true);
      }}
      className="relative px-6 border  border-white bg-gray-500 hover:bg-black  transition hover:-translate-y-1 hover:scale-110 cursor-pointer "
    >
      <p className="absolute top-0   text-sm md:text-base lg:text-md">
        {tv.name}
      </p>
      <div className="relative   p-20 my-7   ">
        <Image
          src={`https://image.tmdb.org/t/p/w500${
            tv.backdrop_path || tv.poster_path
          }`}
          className="rounded-sm object-contain   "
          layout="fill"
          alt="error Image"
        />
      </div>
    </div>
  );
};

export default TvMap;
