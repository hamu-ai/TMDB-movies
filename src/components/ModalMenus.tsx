import { FC, ReactNode, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { db } from "src/lib/firebase";
import { MoviesDataState } from "src/atom/MovieState";
import { useRecoilState } from "recoil";
import Mueus from "./Menus";
import Favorite from "@mui/icons-material/Favorite";

type Props = {
  props?: ReactNode;
};

const ModalMenus: FC<Props> = ({ props }) => {
  const [movies, setMovies] = useRecoilState(MoviesDataState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handledelet = async () => {
    await deleteDoc(doc(db, "movies", `${movies?.id}`));

    toast(`${movies?.title || movies?.original_name} 削除`, {
      duration: 2000,
    });
    setAnchorEl(null);
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      <Mueus
        Icons={<Favorite fontSize="small" color="warning" />}
        props={props}
        data={<MenuItem onClick={handledelet}>お気に入り解除</MenuItem>}
      />
    </div>
  );
};

export default ModalMenus;
