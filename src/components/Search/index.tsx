import { Button, Pagination, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { FC, Suspense, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  MoviesState,
  SearchDeliberation,
  SearchState,
} from "src/atom/MovieState";
import { Movies } from "src/type";

import Modals from "../Modal";
import { SearcMap } from "./SearcMap";

const TvSearch: FC = () => {
  const deliberation = useRecoilValue(SearchDeliberation);
  const TV = useRecoilValue(MoviesState);

  const [text, setText] = useState("ヴァイオレット");
  const [movieData, setMovieData] = useState<Movies[]>([]);
  const [search, setSearch] = useRecoilState(SearchState);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // TV　movie のデータを発見できるAPI

  const fetchSearch = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/${deliberation?.lookup}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ja&query=${text}&page=${page}`
      );
      const res = await data.json();

      setTotalPage(res.total_pages);
      setMovieData(res.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className=" relative top-10">
      <div className="flex justify-center  gap-x-5">
        <Button
          className={`${
            search === true ? "px-4 SearcTrue" : "px-4 relative top-3"
          } `}
          onClick={() => setSearch(true)}
        >
          TV
        </Button>

        <Button
          className={`${
            search === false ? "px-4 SearcTrue " : "px-4 relative top-3"
          } `}
          onClick={() => setSearch(false)}
        >
          映画
        </Button>
      </div>

      {/* 　検索　 */}
      <div className="relative top-7  ">
        <div className="flex justify-center gap-x-2">
          <TextInput
            label={`${deliberation?.title} 検索`}
            onChange={(e) => setText(e.target.value)}
          />

          <Button
            onClick={() => {
              fetchSearch();
            }}
            className=" py-2 bg-blue-600 mt-6"
          >
            <IconSearch />
          </Button>
        </div>
      </div>

      {/* 　ページネーション　 */}
      <div className="relative top-10  flex justify-center">
        <Pagination
          total={totalPage}
          styles={(theme) => ({
            item: {
              "&[data-active]": {
                backgroundImage: theme.fn.gradient({
                  from: "red",
                  to: "yellow",
                }),
              },
            },
          })}
          onChange={(page) => {
            setPage(page);
          }}
        />
      </div>

      <Suspense fallback={<p>Loading...</p>}>
        <div className="relative top-14   Searchgrid  gap-5 mb-36  mx-2">
          {movieData?.map((movie) => (
            <SearcMap key={movie.id} shows={movie} />
          ))}
        </div>
      </Suspense>

      {TV && <Modals />}
    </div>
  );
};

export default TvSearch;
