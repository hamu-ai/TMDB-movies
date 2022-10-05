import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MoviesDataState, MoviesState } from "src/atom/MovieState";
import Meta from "src/components/Meta";
import Modals from "src/components/Modal";
import { ScreenFavo } from "src/components/ScreenFavo";
import { useAuth } from "src/hook/AuthContext";
import { db } from "src/lib/firebase";
import { Movies } from "src/type";

const Favorite: NextPage = () => {
  const movieModal = useRecoilValue(MoviesState);
  const setOpen = useSetRecoilState(MoviesState);
  const setMovies = useSetRecoilState(MoviesDataState);
  const [movieData, setMovieData] = useState<Movies[]>([]);
  const { user } = useAuth();

  // firestoreのデータ取得
  useEffect(() => {
    if (!user?.uid) return;
    const postData = collection(db, "movies", user!.uid, "movie");
    getDocs(postData).then((snapShot) => {
      setMovieData(snapShot.docs.map((doc) => ({ ...doc.data().movies })));
    });
    // リアルタイムでデータ取得
    onSnapshot(postData, (post) => {
      setMovieData(post.docs.map((doc) => ({ ...doc.data().movies })));
    });
  }, [user]);

  return (
    <div className="relative top-20  ">
      <Meta title="お気に入り" />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="relative top-5  Favorite gap-4  mx-2 mb-80  ">
        {movieData.map((data) => {
          return (
            <div key={data.id} className="relative Transition ">
              <div
                onClick={() => {
                  setOpen(true);
                  setMovies(data);
                }}
                className="relative w-full h-40 md:h-48 border-solid border-white  "
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${
                    data?.poster_path || data?.backdrop_path
                  }`}
                  layout="fill"
                  alt="error"
                />
                <p className="absolute top-0 bg-opacity-50 m-0 bg-black  text-sm text-white ">
                  {data.title || data.original_title || data.name}
                </p>
              </div>
              <div className="absolute bottom-0 right-0 ">
                <ScreenFavo data={data} />
              </div>
            </div>
          );
        })}
      </div>
      {movieModal && <Modals />}
    </div>
  );
};

export default Favorite;
