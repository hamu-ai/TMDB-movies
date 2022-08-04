import { FC } from "react";
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import { MouseEventHandler, useState } from "react";
import { Movies } from "src/type";
import SearchIcon from "@mui/icons-material/Search";
import { MoviesDataState, MoviesState, SearchState } from "src/atom/MovieState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import TvIds from "src/components/TV";

const TvSearch: FC = () => {
  const TV = useRecoilValue(MoviesState);

  const [text, setText] = useState("");
  const [show, setShow] = useState<Movies[]>([]);
  const setSearch = useSetRecoilState(SearchState);
  const [movies, setMovies] = useRecoilState(MoviesDataState);
  const [open, setOpen] = useRecoilState(MoviesState);

  // TVのデータを発見できるAPI

  const fetchSearch: MouseEventHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ja&query=${text}`
      );
      const res = await data.json();

      setShow(res.results);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen relative top-10   ">
      <p className="text-center font-bold text-xl relative top-3">TV検索</p>
      <div className="relative top-7 flex justify-center gap-x-6">
        <Button variant="text" onClick={() => setSearch(false)}>
          映画検索
        </Button>

        <form className="flex justify-center">
          <TextField
            id="outlined-helperText"
            label="TV"
            className="bg-white"
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={fetchSearch} className=" py-2 bg-blue-600">
            <SearchIcon sx={{ fontSize: 40 }} />
          </button>
        </form>
      </div>

      <div className="relative top-14   grid  grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5   gap-2  mx-2">
        {show?.map((shows) => {
          return (
            <div
              onClick={() => {
                setOpen(true);
                setMovies(shows);
              }}
              key={shows.id}
              className="relative w-full h-40 border border-white  "
            >
              {shows.backdrop_path || shows.poster_path ? (
                <>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${
                      shows.backdrop_path || shows.poster_path
                    }`}
                    className="rounded-sm object-cover  transition hover:-translate-y-1 hover:scale-110 cursor-pointer  "
                    layout="fill"
                    alt={`${shows.name || shows.title}`}
                  />
                  <p className="absolute top-0 bg-black bg-opacity-50">
                    {shows?.name}
                  </p>
                  {shows.vote_average && (
                    <p className="absolute right-0 bottom-0 bg-orange-600 rounded-lg ">
                      評価{shows.vote_average}
                    </p>
                  )}
                </>
              ) : (
                <div>{shows.name || shows.title}</div>
              )}
            </div>
          );
        })}
      </div>
      {TV && <TvIds />}
    </div>
  );
};

export default TvSearch;
