import { FC, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "src/lib/firebase";
import { useAuth } from "src/hook/AuthContext";
import { Movies } from "src/type";
import { ActionIcon } from "@mantine/core";
import { IconHeart, IconHeartOff } from "@tabler/icons";

type Props = {
  post?: Movies;
};

export const ScreenFavo: FC<Props> = ({ post }) => {
  const { user } = useAuth();
  const [add, setAdd] = useState(false);
  const [movie, setMovie] = useState<Movies[]>([]);

  // firestoreのデータ取得

  useEffect(() => {
    if (!user) return;

    const postData = collection(db, "movies", user!.uid, "movie");
    getDocs(postData).then((snapShot) => {
      setMovie(snapShot.docs.map((doc) => ({ ...doc.data().movies })));
    });

    onSnapshot(postData, (post) => {
      setMovie(post.docs.map((doc) => ({ ...doc.data().movies })));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, post?.id]);

  // 取得したデータの有無で　false ture　setAddに入れて返す

  useEffect(
    () => {
      setAdd(movie.findIndex((result) => result.id === post?.id) !== -1);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [movie]
  );

  const handleList = async () => {
    if (add) {
      await deleteDoc(
        doc(db, "movies", user!.uid, "movie", post?.id.toString()!)
      );

      toast(`${post?.name || post?.title || post?.original_name} 削除`, {
        duration: 2000,
      });
      setAdd(false);
    } else {
      await setDoc(
        doc(db, "movies", user!.uid, "movie", post?.id.toString()!),
        {
          movies: post,
        }
      );

      toast(
        `${post?.name || post?.title || post?.original_name} 
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
      <div onClick={handleList}>
        {add ? (
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
