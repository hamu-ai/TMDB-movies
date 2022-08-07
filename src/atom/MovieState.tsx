import { atom, selector } from "recoil";
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

export const SearchDeliberation = selector({
  key: "SearchDeliberation",
  get: ({ get }) => {
    const filter = get(SearchState);

    switch (filter) {
      case true:
        return { title: "TV", lookup: "tv" };

      case false:
        return { title: "映画", lookup: "movie" };

      default:
        null;
    }
  },
});
