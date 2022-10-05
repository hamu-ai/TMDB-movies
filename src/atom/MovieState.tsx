import { atom, selector } from "recoil";
import { Movies } from "src/type";

// TV Movie　の動画をModalで表示
export const MoviesState = atom({
  key: "MoviesState",
  default: false,
});

// TV Movie APIのデータ
export const MoviesDataState = atom<Movies | null>({
  key: "MoviesDataState",
  default: null,
});

// true falseによって、ボタンのデザイン変化
export const SearchState = atom({
  key: "SearchState",
  default: true,
});

// 検索サイトのTV Movieデータを発見できるAPIの状態変化
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

// 設定ページのメールアドレス表示をリアルタイムで変更
export const SettingState = atom({
  key: "SettingState",
  default: false,
});

// 設定ページのアップデートするModal表示
export const SettingUpdate = atom({
  key: "SettingUpdate",
  default: false,
});

// 設定ページのアクセス確認のmodal表示
export const SettingConfirmation = atom({
  key: "SettingConfirmation",
  default: false,
});
