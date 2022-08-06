import { FC, useEffect } from "react";
import { Pagination, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Movies } from "src/type";
import SearchIcon from "@mui/icons-material/Search";
import { MoviesState, SearchState } from "src/atom/MovieState";
import { useRecoilState, useRecoilValue } from "recoil";
import TvIds from "src/components/TV";
import Modals from "../Modal";
import { SearcMap } from "./SearcMap";

type Props = {
  lookup: string;
  title: string;
};

const TvSearch: FC<Props> = ({ lookup, title }) => {
  const TV = useRecoilValue(MoviesState);

  const [text, setText] = useState("鬼滅");
  const [show, setShow] = useState<Movies[]>([]);
  const [search, setSearch] = useRecoilState(SearchState);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  // TV　movie のデータを発見できるAPI

  const fetchSearch = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/${lookup}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ja&query=${text}&page=${page}`
      );
      const res = await data.json();

      setTotal(res.total_pages);
      setShow(res.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="h-screen relative top-10   ">
      <div className="flex justify-center  gap-x-5">
        <button>
          <p
            className={`${
              search === true
                ? "text-blue-300 px-4 SearcTrue "
                : "  px-4 font-bold text-1xl relative top-3"
            } `}
            onClick={() => setSearch(true)}
          >
            TV
          </p>
        </button>

        <button>
          <p
            className={`${
              search === false
                ? "text-blue-300  px-4 SearcTrue "
                : "  px-4 font-bold text-1xl relative top-3"
            } `}
            onClick={() => setSearch(false)}
          >
            映画
          </p>
        </button>
      </div>
      <div className="relative top-7 flex justify-center gap-x-6">
        <div className="flex justify-center">
          <TextField
            id="outlined-helperText"
            label={`${title} 検索`}
            className="bg-white"
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={() => {
              fetchSearch();
            }}
            className=" py-2 bg-blue-600"
          >
            <SearchIcon sx={{ fontSize: 40 }} />
          </button>
        </div>
      </div>
      <div className="relative top-10  flex justify-center">
        <Stack spacing={2} className="bg-white">
          <Pagination
            count={total}
            variant="outlined"
            color="primary"
            onChange={(e, page) => {
              setPage(page);
            }}
          />
        </Stack>
      </div>

      <div className="relative top-14   Searchgrid  gap-5  mx-2">
        {show?.map((shows) => (
          <SearcMap key={shows.id} shows={shows} />
        ))}
      </div>
      {search === true ? (
        <div>{TV && <TvIds />}</div>
      ) : (
        <div>{TV && <Modals />}</div>
      )}
    </div>
  );
};

export default TvSearch;
