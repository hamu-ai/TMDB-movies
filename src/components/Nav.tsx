import Link from "next/link";
import { Menu, Text, Burger } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  IconSearch,
  IconHome,
  IconMovie,
  IconBookmark,
  IconBook2,
} from "@tabler/icons";

const Nav = () => {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const dd = window.outerWidth;
    if (dd < 570) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  }, []);

  return (
    <div className="flex flex-1 gap-x-7 items-center cursor-pointer  ">
      <Link href="/">
        <h1 className="font-bold text-2xl ">Movies</h1>
      </Link>
      <div className="flex  mt-2  ">
        {menu === false ? (
          <div className="flex gap-x-2 items-center">
            <Link href="/tv/1">
              <h1 className="NavText ">TV</h1>
            </Link>

            <Link href="/Search">
              <h1 className="NavText ">検索</h1>
            </Link>

            <Link href="/favorite">
              <h1>
                <IconBook2 />
              </h1>
            </Link>
          </div>
        ) : (
          <>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Burger opened={false} />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Link href="/">
                  <Menu.Item icon={<IconHome size={14} />}>Home</Menu.Item>
                </Link>
                <Link href="/tv/1">
                  <Menu.Item icon={<IconMovie size={14} />}>TV</Menu.Item>
                </Link>
                <Link href="/Search">
                  <Menu.Item
                    icon={<IconSearch size={14} />}
                    rightSection={
                      <Text size="xs" color="dimmed">
                        ⌘K
                      </Text>
                    }
                  >
                    Search
                  </Menu.Item>
                </Link>
                <Link href="/favorite">
                  <Menu.Item icon={<IconBookmark size={14} />}>
                    favorite
                  </Menu.Item>
                </Link>
                <Menu.Divider />
              </Menu.Dropdown>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
