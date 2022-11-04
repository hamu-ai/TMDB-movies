export type MoviesData = {
  dates: { maximum: string; minimum: string };
  page: number;
  results: Movies[];
  total_pages: number;
  total_results: number;
};

export type Movies = {
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  languages: string;
  seasons: [];
  homepage: string;
};

export type Element = {
  type: "Trailer";
};
