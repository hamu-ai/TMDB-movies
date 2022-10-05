import { ActionIcon } from "@mantine/core";
import { IconHeart, IconHeartOff } from "@tabler/icons";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "src/hook/AuthContext";
import { db } from "src/lib/firebase";
import { Movies } from "src/type";

type Props = {
  data?: Movies;
};

export const ScreenFavo: FC<Props> = ({ data }) => {
  const { user } = useAuth();
  const [hasData, setHasData] = useState(false);
  const [movieData, setMovieData] = useState<Movies[]>([]);

  // firestoreのデータ取得

  useEffect(() => {
    if (!user) return;

    const postData = collection(db, "movies", user!.uid, "movie");
    getDocs(postData).then((snapShot) => {
      setMovieData(snapShot.docs.map((doc) => ({ ...doc.data().movies })));
    });

    onSnapshot(postData, (post) => {
      setMovieData(post.docs.map((doc) => ({ ...doc.data().movies })));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, data?.id]);

  // 取得したデータの有無で　false ture　setAddに入れて返す

  useEffect(
    () => {
      setHasData(
        movieData.findIndex((result) => result.id === data?.id) !== -1
      );
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [movieData]
  );

  const handleList = async () => {
    if (hasData) {
      await deleteDoc(
        doc(db, "movies", user!.uid, "movie", data?.id.toString()!)
      );

      toast(`${data?.name || data?.title || data?.original_name} 削除`, {
        duration: 2000,
      });
      setHasData(false);
    } else {
      await setDoc(
        doc(db, "movies", user!.uid, "movie", data?.id.toString()!),
        {
          movies: data,
        }
      );

      toast(
        `${data?.name || data?.title || data?.original_name} 
          登録`,
        {
          duration: 2000,
        }
      );
      setHasData(true);
    }
  };
  return (
    <div>
      <div onClick={handleList}>
        {hasData ? (
          <ActionIcon
            variant="filled"
            className="bg-orange-500 hover:bg-orange-500 "
            size={30}
          >
            <IconHeart size={28} />
          </ActionIcon>
        ) : (
          <ActionIcon variant="filled" size={30}>
            <IconHeartOff size={28} />
          </ActionIcon>
        )}
      </div>
    </div>
  );
};
