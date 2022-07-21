export const URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const response = {
  fetchcomingSoon: `${URL}/movie/upcoming?api_key=${API_KEY}&language=ja&page=3`,
  fetchTopRating: `${URL}/movie/top_rated?api_key=${API_KEY}&language=ja&page=2`,
  fetchpopular: `${URL}/movie/popular?api_key=${API_KEY}&language=ja&page=1`,
  fetchtrend: `${URL}/trending/movie/day?api_key=${API_KEY}&language=ja&page=2`,
};
