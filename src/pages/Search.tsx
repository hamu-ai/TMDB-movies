import { NextPage } from "next";
import TvSearch from "src/components/Search";
import { Toaster } from "react-hot-toast";
import Meta from "src/components/Meta";

const Search: NextPage = () => {
  return (
    <div className="h-screen relative top-8   ">
      <Meta title="検索" />
      <Toaster position="top-center" reverseOrder={false} />
      <TvSearch />
    </div>
  );
};

export default Search;
