import { Button } from "@mantine/core";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { SearchState } from "src/atom/MovieState";

const Select: FC = () => {
  const [search, setSearch] = useRecoilState(SearchState);
  return (
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
  );
};

export default Select;
