import { NextPage } from "next";
import { SearchState } from "src/atom/MovieState";
import { useRecoilState } from "recoil";
import TvSearch from "src/components/TvSearch";

import MovieSearch from "src/components/MovieSearch";
import { Toaster } from "react-hot-toast";

const Search: NextPage = () => {
  const [search, setSearch] = useRecoilState(SearchState);
  return (
    <div className="h-screen relative top-8   ">
      <Toaster position="top-center" reverseOrder={false} />
      {search ? <TvSearch /> : <MovieSearch />}
    </div>
  );
};

export default Search;
