import Image from "next/image";
import { FC, useRef, useState } from "react";
import { Movies } from "src/type";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
type Props = {
  title: string;
  movie: Movies[];
};

const Moviemain: FC<Props> = ({ title, movie }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (direction: string) => {
    if (ref.current) {
      const scrollLeft = ref.current.scrollLeft;
      const clientWidth = ref.current.clientWidth;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      ref.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className=" text-2xl  ">
      <h1 className="pl-3">{title}</h1>
      <div
        ref={ref}
        className="flex  mx-3  overflow-x-scroll scrollbar-hide my-5 h-full"
      >
        {movie.map((movies) => {
          return (
            <div
              key={movies.id}
              className="relative md:h-40 mx-1 md:w-screen md:px-20 h-20 w-20  px-20  "
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${
                  movies.backdrop_path || movies.poster_path
                }`}
                className="rounded-sm object-cover  transition hover:-translate-y-1 hover:scale-110 cursor-pointer "
                layout="fill"
                alt="error"
              />
            </div>
          );
        })}

        <ArrowBackIos
          onClick={() => handleClick("left")}
          className=" absolute left-5 mt-8  md:mt-16 md:ml-2 transition hover:-translate-y-1 hover:scale-110 cursor-pointer "
          sx={{
            "@media screen and (min-width:765px)": {
              fontSize: 40,
            },
          }}
        />

        <ArrowForwardIosIcon
          onClick={() => handleClick("right")}
          className="absolute right-5 mt-8 md:mt-16 md:mr-2   transition hover:-translate-y-1 hover:scale-110 cursor-pointer"
          sx={{
            "@media screen and (min-width:765px)": {
              fontSize: 40,
            },
          }}
        />
      </div>
    </div>
  );
};

export default Moviemain;
