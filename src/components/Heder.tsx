import { MenuItem } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useAuth } from "src/hook/AuthContext";
import Nav from "./Nav";
import Mueus from "./Menus";
import Logout from "@mui/icons-material/Logout";

const Heder: FC = () => {
  const { singOut } = useAuth();
  const [isScroll, setScroll] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handlLogout = () => {
    singOut();
    setAnchorEl(null);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  });
  return (
    <div
      className={`
    ${isScroll ? "bg-red-600 text-white" : "text-red-600"} 
    flex w-screen  h-10 p-10 items-center  fixed z-10  `}
    >
      <Nav />
      <Mueus
        style={"!bg-blue-600  hover:!bg-blue-400"}
        Icons={<Logout fontSize="small" />}
        props={<MenuItem onClick={handlLogout}>ログアウトしますか？</MenuItem>}
      />
    </div>
  );
};

export default Heder;
