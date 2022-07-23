import { Button, Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useAuth } from "src/hook/AuthContext";

const Heder: FC = () => {
  const [isScroll, setScroll] = useState(false);

  const { singOut } = useAuth();

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
    flex w-screen  h-10 p-10 items-center  fixed z-10`}
    >
      <h1 className="font-bold text-2xl flex-1 ">Movies</h1>
      <Stack spacing={2} direction="row">
        <Button onClick={singOut} variant="contained">
          ログアウト
        </Button>
      </Stack>
    </div>
  );
};

export default Heder;
