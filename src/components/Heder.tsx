import { FC, useEffect, useState } from "react";
import { useAuth } from "src/hook/AuthContext";
import Nav from "./Nav";

import { Menu, Button } from "@mantine/core";

const Heder: FC = () => {
  const { singOut } = useAuth();
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
    flex w-screen  h-10 p-10 items-center  fixed z-10  `}
    >
      <Nav />
      <div className="mt-3">
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button>ログアウト</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => singOut()}>
              ログアウトしますか？
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};

export default Heder;
