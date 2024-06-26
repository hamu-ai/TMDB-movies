import { Modal } from "@mantine/core";
import { IconAccessPoint, IconAccessPointOff } from "@tabler/icons";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useRecoilState } from "recoil";
import { MoviesDataState, MoviesState } from "src/atom/MovieState";
import { Element, Movies } from "src/type";
import { URL } from "src/utils";

import { DeleteRegistration } from "./DeleteRegistration";

const Modals: FC = () => {
  const [open, setOpen] = useRecoilState(MoviesState);
  const [moviesData] = useRecoilState(MoviesDataState);
  const [data, setData] = useState("");
  const [muted, setMuted] = useState(false);
  const [home, setHome] = useState("");
  const [extract_Movie, setExtract_Movie] = useState<Movies | null>(null);

  const [beside, setBeside] = useState(1);

  //　Modleの横幅
  useEffect(() => {
    if (window.outerWidth > 1000) {
      setBeside(1);
    } else if (window.outerWidth > 800) {
      setBeside(2);
    } else {
      setBeside(3);
    }
  }, []);

  // 映画●ドラマのムービー取得してkeyをsetDataに入れる
  useEffect(() => {
    if (!moviesData) return;
    setExtract_Movie(moviesData);

    const WatchVideo = async () => {
      const data = await fetch(
        `${URL}/${moviesData.title ? "movie" : "tv"}/${
          moviesData?.id
        }?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=${
          moviesData?.original_language
        }&append_to_response=videos`
      ).then((res) => res.json());

      setHome(data.homepage);
      if (data.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setData(data.videos?.results[index]?.key);
      }
    };
    WatchVideo();
  }, [moviesData]);

  return (
    <div>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        size={`${
          beside === 1
            ? "50%"
            : beside === 2
            ? "70%"
            : beside === 3
            ? "100%"
            : "100%"
        }`}
      >
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
              <div className="relative  ml-6">
                {extract_Movie ? (
                  <DeleteRegistration data={extract_Movie} />
                ) : null}
              </div>
              <button
                onClick={() => setMuted(!muted)}
                className="ml-2 cursor-pointer"
              >
                {muted === false ? <IconAccessPoint /> : <IconAccessPointOff />}
              </button>
            </div>
          </>
        )}
        {!data && (
          <div className="relative p-20 mt-7 mb-10  mx-auto w-1/3 h-56 ">
            {moviesData?.poster_path || moviesData?.backdrop_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${
                  moviesData?.poster_path || moviesData?.backdrop_path
                }`}
                layout="fill"
                alt="error"
              />
            ) : null}
          </div>
        )}
        <div className="relative  bottom-5">
          <h1 className="ml-4 text-base mt-6  mb-2 ">
            {moviesData?.title || moviesData?.name}
          </h1>
          <div className="flex gap-x-3 ml-4">
            {moviesData?.release_date ? (
              <p>公開日{moviesData?.release_date}</p>
            ) : null}
            <p>評価{moviesData?.vote_average}</p>
          </div>
          <div>
            <Link href={home} passHref>
              <a
                className=" ml-4 text-red-500 hover:text-red-700"
                target="_blank"
              >
                ホームページ
              </a>
            </Link>
          </div>
          <p className="text-xs md:text-xl ml-4 ">{moviesData?.overview}</p>
        </div>
      </Modal>
    </div>
  );
};

export default Modals;
