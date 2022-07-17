import Image from "next/image";
import { FC } from "react";
import { Movies } from "src/type";

type Props = {
  title: string;
  movie: Movies[];
};

const Moviemain: FC<Props> = ({ title, movie }) => {
  return (
    <div className=" text-2xl">
      <h1 className="pl-3">{title}</h1>
      <div className="flex overflow-x-auto mx-2  my-5 h-full">
        {movie.map((movies) => {
          return (
            <div
              key={movies.id}
              className="relative md:h-40 md:w-screen md:px-20 h-20 w-20  px-20  "
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
      </div>
    </div>
  );
};

export default Moviemain;
