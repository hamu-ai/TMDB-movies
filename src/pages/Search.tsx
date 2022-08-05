import { NextPage } from "next";
import { SearchState } from "src/atom/MovieState";
import { useRecoilValue } from "recoil";
import TvSearch from "src/components/Search";

import { Toaster } from "react-hot-toast";

const Search: NextPage = () => {
  const search = useRecoilValue(SearchState);
  return (
    <div className="h-screen relative top-8   ">
      <Toaster position="top-center" reverseOrder={false} />
      {search ? (
        <TvSearch title={"TV"} lookup={"tv"} />
      ) : (
        <TvSearch title={"映画"} lookup={"movie"} />
      )}
    </div>
  );
};

export default Search;
