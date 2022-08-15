import { NextPage } from "next";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "src/lib/firebase";
import { MoviesDataState, MoviesState } from "src/atom/MovieState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Movies } from "src/type";
import Image from "next/image";
import Modals from "src/components/Modal";
import { useAuth } from "src/hook/AuthContext";
import { Toaster } from "react-hot-toast";
import { ScreenFavo } from "src/components/ScreenFavo";
import Meta from "src/components/Meta";

const Favorite: NextPage = () => {
  const movieModal = useRecoilValue(MoviesState);
  const setOpen = useSetRecoilState(MoviesState);
  const setMovies = useSetRecoilState(MoviesDataState);
  const [posts, setPosts] = useState<Movies[]>([]);
  const { user } = useAuth();

  // firestoreのデータ取得
  useEffect(() => {
    if (!user?.uid) return;
    const postData = collection(db, "movies", user!.uid, "movie");
    getDocs(postData).then((snapShot) => {
      setPosts(snapShot.docs.map((doc) => ({ ...doc.data().movies })));
    });
    // リアルタイムでデータ取得
    onSnapshot(postData, (post) => {
      setPosts(post.docs.map((doc) => ({ ...doc.data().movies })));
    });
  }, [user]);

  return (
    <div className="relative top-20  ">
      <Meta title="お気に入り" />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="relative top-5  Favorite gap-4  mx-2 mb-80  ">
        {posts.map((post) => {
          return (
            <div key={post.id} className="relative Transition ">
              <div
                onClick={() => {
                  setOpen(true);
                  setMovies(post);
                }}
                className="relative w-full h-40 md:h-48 border-solid border-white  "
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${
                    post?.poster_path || post?.backdrop_path
                  }`}
                  layout="fill"
                  alt="error"
                />
                <p className="absolute top-0 bg-opacity-50 m-0 bg-black  text-sm text-white ">
                  {post.title || post.original_title || post.name}
                </p>
              </div>
              <div className="absolute bottom-0 right-0 ">
                <ScreenFavo post={post} />
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
