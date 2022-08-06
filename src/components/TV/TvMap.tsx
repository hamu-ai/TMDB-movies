import { FC } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { MoviesDataState, MoviesState } from "src/atom/MovieState";
import { Movies } from "src/type";
import ModalMenus from "../ModalAddRemove";

type Props = {
  tv: Movies;
};

const TvMap: FC<Props> = ({ tv }) => {
  const [movies, setMovies] = useRecoilState(MoviesDataState);
  const [open, setOpen] = useRecoilState(MoviesState);
  return (
    <div className="relative mx-auto mb-3">
      <div
        onClick={() => {
          setMovies(tv);
          setOpen(true);
        }}
        className="relative px-6 border  border-white bg-gray-500 hover:bg-black  Transition "
      >
        <p className="absolute top-0   text-sm md:text-base lg:text-md">
          {tv.name}
        </p>
        <div className="relative  h-56 w-52 md:w-40  mt-7  ">
          <Image
            src={`https://image.tmdb.org/t/p/w500${
              tv.poster_path || tv.backdrop_path
            }`}
            className="rounded-sm  "
            layout="fill"
            alt="error Image"
          />
        </div>
      </div>
      <div className="absolute right-7 bottom-0  ">
        <ModalMenus post={tv} />
      </div>
    </div>
  );
};

export default TvMap;
