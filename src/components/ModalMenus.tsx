import { FC, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "src/lib/firebase";
import { MoviesDataState } from "src/atom/MovieState";
import { useRecoilState } from "recoil";
import Mueus from "./Menus";

const ModalMenus: FC = () => {
  const [movies, setMovies] = useRecoilState(MoviesDataState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleAdd = async () => {
    await setDoc(doc(db, "movies", `${movies?.id}`), {
      movies,
    });

    toast(
      `${movies?.title || movies?.original_name} 
          登録`,
      {
        duration: 1000,
      }
    );
    setAnchorEl(null);
  };

  const handledelet = async () => {
    await deleteDoc(doc(db, "movies", `${movies?.id}`));

    toast(`${movies?.title || movies?.original_name} 削除`, {
      duration: 1000,
    });
    setAnchorEl(null);
  };

  return (
    <div>
      <Mueus
        Icons={<FavoriteBorder fontSize="small" color="secondary" />}
        props={<MenuItem onClick={handleAdd}>お気に入り登録</MenuItem>}
        data={<MenuItem onClick={handledelet}>お気に入り解除</MenuItem>}
      />
    </div>
  );
};

export default ModalMenus;
