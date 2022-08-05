import Image from "next/image";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { MoviesDataState, MoviesState } from "src/atom/MovieState";
import { Movies } from "src/type";

type Props = {
  shows: Movies;
};

export const SearcMap: FC<Props> = ({ shows }) => {
  const [movies, setMovies] = useRecoilState(MoviesDataState);
  const [open, setOpen] = useRecoilState(MoviesState);
  return (
    <div className="border border-red-700 bg-gray-600 hover:bg-black  transition hover:-translate-y-1 hover:scale-110 cursor-pointer p-3">
      <div
        onClick={() => {
          setOpen(true);
          setMovies(shows);
        }}
        className="relative w-full h-52 xl:h-60   "
      >
        {shows.backdrop_path || shows.poster_path ? (
          <>
            <Image
              src={`https://image.tmdb.org/t/p/w500${
                shows.backdrop_path || shows.poster_path
              }`}
              className="rounded-sm    "
              layout="fill"
              alt={`${shows.name || shows.title}`}
            />
            <p className="absolute top-0 bg-black bg-opacity-50">
              {shows?.name || shows?.title}
            </p>
            {shows.vote_average ? (
              <p className="absolute right-0 bottom-0 bg-orange-600 rounded-lg ">
                評価{shows.vote_average}
              </p>
            ) : null}
          </>
        ) : (
          <div>{shows.name || shows.title}</div>
        )}
      </div>
    </div>
  );
};
