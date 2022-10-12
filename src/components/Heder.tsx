import { FC, useEffect, useState } from "react";

import Nav from "./Nav";

const Heder: FC = () => {
  const [isScroll, setScroll] = useState(false);

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
    ${
      isScroll
        ? "bg-red-600 text-white"
        : "bg-red-400  bg-opacity-50 text-red-600"
    } 
    flex w-screen  h-10 p-10 items-center  fixed z-10  `}
    >
      <Nav />
    </div>
  );
};

export default Heder;
