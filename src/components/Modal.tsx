import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MuiModal from "@mui/material/Modal";
import Clear from "@mui/icons-material/Clear";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { MoviesDataState, MoviesState } from "src/atom/MovieState";
import { useRecoilState } from "recoil";
import ReactPlayer from "react-player";
import { URL } from "src/utils";
import { Element } from "src/type";

const style = {
  position: "absolute" as "absolute",

  left: "50%",
  transform: "translate( -50%)",
  width: 400,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
};

const Modals: FC = () => {
  const [open, setOpen] = useRecoilState(MoviesState);
  const [movies, setMovies] = useRecoilState(MoviesDataState);
  const [data, setData] = useState("");

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!movies) return;

    const WatchVideo = async () => {
      const data = await fetch(
        `${URL}/${movies?.media_type === "tv" ? "tv" : "movie"}/${
          movies?.id
        }?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((res) => res.json());
      console.log(data);

      if (data.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setData(data.videos?.results[index]?.key);
      }
    };

    WatchVideo();
  }, [movies]);

  return (
    <div>
      <MuiModal open={open} onClose={handleClose}>
        <Box sx={style} className="md:w-1/2  mx-auto bg-black  mt-4   ">
          <Clear onClick={() => setOpen(false)} className="ml-4" />
          <ReactPlayer
            width={"100%"}
            height={300}
            playing
            controls={true}
            url={`https://www.youtube.com/watch?v=${data}`}
          />

          <h1 className="ml-4 lg:text-xl mb-2">{movies?.title}</h1>
          <div className="flex gap-x-3 ml-4">
            <p>公開日{movies?.release_date}</p>
            <p>評価{movies?.vote_average}</p>
            {"お気に入り"}
            <FavoriteBorder className="  " />
          </div>
          <p className="text-xs lg:text-lg lg:max-w-none max-w-xs ml-4">
            {movies?.overview}
          </p>
        </Box>
      </MuiModal>
    </div>
  );
};

export default Modals;
