import { FC, useEffect, useState } from "react";

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
    ${isScroll ? "bg-red-600 text-white" : "text-red-600"} 
    flex w-screen  h-10 p-10 items-center  fixed z-10`}
    >
      <h1 className="font-bold text-2xl ">Movies</h1>
    </div>
  );
};

export default Heder;
