import Image from "next/image";
import { FC } from "react";
import { useSetRecoilState } from "recoil";
import { MoviesDataState, MoviesState } from "src/atom/MovieState";
import { Movies } from "src/type";

import { DeleteRegistration } from "../DeleteRegistration";

type Props = {
  tv: Movies;
};

const TvMap: FC<Props> = ({ tv }) => {
  const setMoviesData = useSetRecoilState(MoviesDataState);
  const setOpen = useSetRecoilState(MoviesState);
  return (
    <div className="relative mx-auto mb-3">
      <div
        onClick={() => {
          setMoviesData(tv);
          setOpen(true);
        }}
        className="relative p-6 border-solid border-gray-500 bg-gray-500 Transition "
      >
        <p className="absolute top-0  text-sm lg:text-md">{tv.name}</p>
        <div className="relative  h-56 w-52 md:w-40  mt-7  ">
          <Image
            src={`https://image.tmdb.org/t/p/w500${
              tv.poster_path || tv.backdrop_path
            }`}
            className="rounded-sm "
            layout="fill"
            alt="error Image"
          />
        </div>
      </div>
      <div className="absolute right-7 bottom-6  ">
        <DeleteRegistration data={tv} />
      </div>
    </div>
  );
};

export default TvMap;
