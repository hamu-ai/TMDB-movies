import { FC, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "src/lib/firebase";
import { MoviesDataState } from "src/atom/MovieState";
import { useRecoilState } from "recoil";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useAuth } from "src/hook/AuthContext";
import { Movies } from "src/type";

type Props = {
  post?: Movies;
};

const ModalMenus: FC<Props> = ({ post }) => {
  const [movies, setMovies] = useRecoilState(MoviesDataState);
  const { user } = useAuth();
  const [add, setAdd] = useState(false);
  const [movie, setMovie] = useState<Movies[]>([]);

  // firestoreのデータ取得

  useEffect(() => {
    if (user) {
      const postData = collection(db, "movies", user!.uid, "movie");
      getDocs(postData).then((snapShot) => {
        setMovie(snapShot.docs.map((doc) => ({ ...doc.data().movies })));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, movies?.id, post?.id]);

  // 取得したデータの有無で　false ture　setAddに入れて返す

  useEffect(
    () =>
      setAdd(
        movie.findIndex(
          (result) => result.id === movies?.id || result.id === post?.id
        ) !== -1
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [movie]
  );

  const handleList = async () => {
    if (add) {
      await deleteDoc(
        doc(
          db,
          "movies",
          user!.uid,
          "movie",
          movies?.id.toString()! || post?.id.toString()!
        )
      );

      toast(
        `${
          movies?.title ||
          movies?.original_name ||
          post?.title ||
          post?.original_name
        } 削除`,
        {
          duration: 2000,
        }
      );
      setAdd(false);
    } else {
      await setDoc(
        doc(
          db,
          "movies",
          user!.uid,
          "movie",
          movies?.id.toString()! || post?.id.toString()!
        ),
        {
          movies: movies || post,
        }
      );

      toast(
        `${
          movies?.title ||
          movies?.original_name ||
          post?.title ||
          post?.original_name
        } 
          登録`,
        {
          duration: 2000,
        }
      );
      setAdd(true);
    }
  };
  return (
    <div>
      <button onClick={handleList}>
        {add ? (
          <Favorite color="warning" className="h-7 w-7" fontSize="large" />
        ) : (
          <FavoriteBorder
            color="warning"
            className="h-7 w-7"
            fontSize="large"
          />
        )}
      </button>
    </div>
  );
};

export default ModalMenus;
