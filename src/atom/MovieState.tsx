import { atom } from "recoil";
import { Movies } from "src/type";

export const MoviesState = atom({
  key: "MoviesState",
  default: false,
});

export const MoviesDataState = atom<Movies | null>({
  key: "MoviesDataState",
  default: null,
});

export const SearchState = atom({
  key: "SearchState",
  default: true,
});
