import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRecoilState, useSetRecoilState } from "recoil";
import { MoviesDataState, MoviesState } from "src/atom/MovieState";
import { DeleteRegistration } from "src/components/DeleteRegistration";
import Meta from "src/components/Meta";
import Modals from "src/components/Modal";
import { useAuth } from "src/hook/AuthContext";
import { db } from "src/lib/firebase";
import { Movies } from "src/type";

const Favorite: NextPage = () => {
  const [open, setOpen] = useRecoilState(MoviesState);
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
            <div key={data.id} className="Transition">
              <p className=" m-0 text-sm ">
                {data.title || data.original_title || data.name}
              </p>

              <div className="relative   border-solid border-gray-500 ">
                <div
                  onClick={() => {
                    setOpen(true);
                    setMovies(data);
                  }}
                  className="relative w-full h-40 md:h-48 "
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${
                      data?.poster_path || data?.backdrop_path
                    }`}
                    layout="fill"
                    alt="error"
                  />
                </div>
                <div className="absolute bottom-0 right-0 ">
                  <DeleteRegistration data={data} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {open && <Modals />}
    </div>
  );
};

export default Favorite;
