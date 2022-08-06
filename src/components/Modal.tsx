import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MuiModal from "@mui/material/Modal";
import Clear from "@mui/icons-material/Clear";
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeOff from "@mui/icons-material/VolumeOff";
import { MoviesDataState, MoviesState } from "src/atom/MovieState";
import { useRecoilState } from "recoil";
import ReactPlayer from "react-player";
import { URL } from "src/utils";
import { Element } from "src/type";
import ModalMenus from "./ModalAddRemove";
import Image from "next/image";

const style = {
  position: "absolute" as "absolute",

  left: "50%",
  transform: "translate( -50%)",

  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
};

const Modals: FC = () => {
  const [open, setOpen] = useRecoilState(MoviesState);
  const [movies, setMovies] = useRecoilState(MoviesDataState);
  const [data, setData] = useState("");
  const [muted, setMuted] = useState(false);

  const handleClose = () => setOpen(false);

  // 映画●のムービー取得してkeyをsetDataに入れる
  useEffect(() => {
    if (!movies) return;

    const WatchVideo = async () => {
      const data = await fetch(
        `${URL}/movie/${movies?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=${movies?.original_language}&append_to_response=videos`
      ).then((res) => res.json());

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
        <Box
          sx={style}
          className="md:w-[60vh] w-full relative mx-auto bg-black  mt-4 "
        >
          <Clear onClick={() => setOpen(false)} className=" absolute right-2" />
          {data && (
            <>
              <ReactPlayer
                width={"100%"}
                height={300}
                playing
                muted={muted}
                url={`https://www.youtube.com/watch?v=${data}`}
              />

              <div className="flex  relative bottom-6 md:bottom-3">
                <div className="relative md:bottom-3 ml-6">
                  <ModalMenus />
                </div>
                <button onClick={() => setMuted(!muted)}>
                  {muted === false ? (
                    <VolumeUp className=" relative md:bottom-3 left-12" />
                  ) : (
                    <VolumeOff className="  relative md:bottom-3 left-12 " />
                  )}
                </button>
              </div>
            </>
          )}
          {!data && (
            <div className="relative w-full  p-20 mt-7   mb-10">
              {movies?.poster_path || movies?.backdrop_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${
                    movies?.poster_path || movies?.backdrop_path
                  }`}
                  className="rounded-sm object-contain    Transition "
                  layout="fill"
                  alt="error"
                />
              ) : null}
            </div>
          )}
          <div className="relative  bottom-5">
            <h1 className="ml-4  lg:text-xl mb-2 ">{movies?.title}</h1>
            <div className="flex gap-x-3 ml-4">
              <p>公開日{movies?.release_date}</p>
              <p>評価{movies?.vote_average}</p>
            </div>
            <p className="text-xs lg:text-lg lg:max-w-none max-w-sm ml-4 ">
              {movies?.overview}
            </p>
          </div>
        </Box>
      </MuiModal>
    </div>
  );
};

export default Modals;
