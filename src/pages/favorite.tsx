import { NextPage } from "next";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "src/lib/firebase";
import { MoviesDataState, MoviesState } from "src/atom/MovieState";
import { useRecoilState, useRecoilValue } from "recoil";
import { Movies } from "src/type";
import Image from "next/image";
import Modals from "src/components/Modal";
import { useAuth } from "src/hook/AuthContext";
import ScreenFavorites from "src/components/ScreenFavorites";

const Favorite: NextPage = () => {
  const movieModal = useRecoilValue(MoviesState);
  const [open, setOpen] = useRecoilState(MoviesState);
  const [movies, setMovies] = useRecoilState(MoviesDataState);
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
    <div className="relative top-20 ">
      <div className="grid grid-cols-3 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-10  gap-4  mx-2   ">
        {posts.map((post) => {
          return (
            <div key={post.id} className="relative">
              <div
                onClick={() => {
                  setOpen(true);
                  setMovies(post);
                }}
                className="relative w-full h-40   border border-white  "
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${
                    post?.poster_path || post?.backdrop_path
                  }`}
                  className="object-cover  "
                  layout="fill"
                  alt="error"
                />
                <p className="absolute top-0 bg-opacity-50 bg-black w-full text-sm ">
                  {post.title || post.original_title}
                </p>
              </div>
              <div className="absolute bottom-0 right-0 ">
                <ScreenFavorites post={post} />
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
