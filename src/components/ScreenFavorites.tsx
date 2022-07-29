import Favorite from "@mui/icons-material/Favorite";
import { deleteDoc, doc } from "firebase/firestore";
import { FC } from "react";
import toast, { Toaster } from "react-hot-toast";

import { useAuth } from "src/hook/AuthContext";
import { db } from "src/lib/firebase";
import { Movies } from "src/type";

type Props = {
  post?: Movies;
};

const ScreenFavorites: FC<Props> = ({ post }) => {
  const { user } = useAuth();
  const handle = async () => {
    await deleteDoc(
      doc(db, "movies", user!.uid, "movie", post?.id.toString()!)
    );

    toast(`${post?.title || post?.original_name} 削除`, {
      duration: 2000,
    });
  };

  return (
    <div>
      <button onClick={handle}>
        <Toaster position="top-center" reverseOrder={false} />
        <Favorite color="warning" className="h-7 w-7" />
      </button>
    </div>
  );
};

export default ScreenFavorites;
