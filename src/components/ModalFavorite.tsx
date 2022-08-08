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

const ModalFavorite: FC = () => {
  const [movies, setMovies] = useRecoilState(MoviesDataState);
  const { user } = useAuth();
  const [add, setAdd] = useState(false);
  const [movie, setMovie] = useState<Movies[]>([]);

  useEffect(() => {
    if (user) {
      const postData = collection(db, "movies", user!.uid, "movie");
      getDocs(postData).then((snapShot) => {
        setMovie(snapShot.docs.map((doc) => ({ ...doc.data().movies })));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, movies?.id]);

  // 取得したデータの有無で　false ture　setAddに入れて返す

  useEffect(
    () => {
      setAdd(movie.findIndex((result) => result.id === movies?.id) !== -1);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [movie]
  );

  const handleList = async () => {
    if (add) {
      await deleteDoc(
        doc(db, "movies", user!.uid, "movie", movies?.id.toString()!)
      );

      toast(`${movies?.title || movies?.name || movies?.original_name} 削除`, {
        duration: 2000,
      });
      setAdd(false);
    } else {
      await setDoc(
        doc(db, "movies", user!.uid, "movie", movies?.id.toString()!),
        {
          movies: movies,
        }
      );

      toast(
        `${movies?.title || movies?.name || movies?.original_name} 
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

export default ModalFavorite;
