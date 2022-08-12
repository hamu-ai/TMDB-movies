import Image from "next/image";
import { FC, useRef, useState } from "react";
import { Movies } from "src/type";
import { MoviesDataState, MoviesState } from "src/atom/MovieState";
import { useSetRecoilState } from "recoil";
import { ScreenFavo } from "./ScreenFavo";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons";
type Props = {
  title?: string;
  movie: Movies[];
};

const Moviemain: FC<Props> = ({ title, movie }) => {
  const setOpen = useSetRecoilState(MoviesState);
  const setMovies = useSetRecoilState(MoviesDataState);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(true);

  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (direction: string) => {
    if (ref.current) {
      const { scrollLeft, clientWidth, scrollWidth } = ref.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      if (scrollTo > 0) {
        setLeft(true);
      } else {
        setLeft(false);
      }

      const ScrollMaxX = scrollWidth - clientWidth;

      if (scrollTo > ScrollMaxX) {
        setRight(false);
      } else {
        setRight(true);
      }

      ref.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className=" text-2xl md:text-3xl ml-3    ">
      <p className=" text-white ">{title}</p>
      <div ref={ref} className="flex   overflow-x-scroll scrollbar-hide my-5 ">
        {movie.map((movies) => {
          return (
            <div key={movies.id} className="mx-1 relative">
              <div
                onClick={() => {
                  setOpen(true);
                  setMovies(movies);
                }}
                className="relative md:h-40   md:px-20 h-20 w-20  px-20  "
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${
                    movies.backdrop_path || movies.poster_path
                  }`}
                  className="rounded-sm object-cover  Transition "
                  layout="fill"
                  alt="error"
                />
              </div>
              <div className="absolute right-0 top-0">
                <ScreenFavo post={movies} />
              </div>
            </div>
          );
        })}
        {left ? (
          <IconArrowLeft
            onClick={() => handleClick("left")}
            className="absolute left-3 mt-8  md:mt-16 md:ml-2 bg-gray-500 bg-opacity-70 Transition"
            size={35}
          />
        ) : null}

        {right ? (
          <IconArrowRight
            onClick={() => handleClick("right")}
            className="absolute right-3 mt-8 md:mt-16 md:mr-2  bg-gray-500 bg-opacity-70  Transition"
            size={35}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Moviemain;
