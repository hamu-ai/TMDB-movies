import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MuiModal from "@mui/material/Modal";
import { MoviesDataState, MoviesState } from "src/atom/MovieState";
import { useRecoilState } from "recoil";
import ReactPlayer from "react-player";
import { URL } from "src/utils";
import { Element } from "src/type";

const style = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
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
        <Box sx={style} className="md:w-1/2  mx-auto bg-black   ">
          <ReactPlayer
            width={"100%"}
            height={300}
            playing
            controls={true}
            url={`https://www.youtube.com/watch?v=${data}`}
          />
        </Box>
      </MuiModal>
    </div>
  );
};

export default Modals;
