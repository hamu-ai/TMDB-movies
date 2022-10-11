import Image from "next/image";
import { FC } from "react";
import { useSetRecoilState } from "recoil";
import { MoviesDataState, MoviesState } from "src/atom/MovieState";
import { Movies } from "src/type";

type Props = {
  shows: Movies;
};

export const SearcMap: FC<Props> = ({ shows }) => {
  const setMoviesData = useSetRecoilState(MoviesDataState);
  const setOpen = useSetRecoilState(MoviesState);
  return (
    <div
      onClick={() => {
        setOpen(true);
        setMoviesData(shows);
      }}
      className="relative  w-40  h-56 lg:w-52 lg:h-64   mx-auto border-solid border-red-700 py-3 bg-gray-500 hover:bg-black  Transition    "
    >
      {shows.backdrop_path || shows.poster_path ? (
        <>
          <Image
            src={`https://image.tmdb.org/t/p/w500${
              shows.poster_path || shows.backdrop_path
            }`}
            className="rounded-sm"
            layout="fill"
            alt={`${shows.name || shows.title}`}
          />
          <p className="absolute top-0 m-0 text-white bg-black bg-opacity-50 text-sm ">
            {shows?.name || shows?.title}
          </p>
          {shows.vote_average ? (
            <p className="absolute right-0 bottom-0 m-0  bg-orange-600 rounded-lg">
              評価{shows.vote_average}
            </p>
          ) : null}
        </>
      ) : (
        <div>{shows.name || shows.title}</div>
      )}
    </div>
  );
};
