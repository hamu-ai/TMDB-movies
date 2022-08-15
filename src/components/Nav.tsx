import Link from "next/link";
import { Menu, Text, Burger, Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  IconSearch,
  IconHome,
  IconMovie,
  IconSettings,
  IconStar,
  IconHeart,
  IconDeviceTv,
} from "@tabler/icons";

const Nav = () => {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const dd = window.outerWidth;
    if (dd < 620) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  }, []);

  return (
    <div className="flex  gap-x-7 items-center cursor-pointer  ">
      <Link href="/">
        <h1 className="font-bold text-2xl ">Movies</h1>
      </Link>
      <div className="flex  mt-2  ">
        {menu === false ? (
          <div className="flex gap-x-3 items-center ">
            <Tabs color="grape" defaultValue="gallery">
              <Tabs.List>
                <Link href="/tv/1">
                  <Tabs.Tab value="gallery" icon={<IconDeviceTv size={20} />}>
                    TV
                  </Tabs.Tab>
                </Link>

                <Link href="/Search">
                  <Tabs.Tab value="gallery" icon={<IconSearch size={20} />}>
                    検索
                  </Tabs.Tab>
                </Link>

                <Link href="/favorite">
                  <Tabs.Tab value="gallery" icon={<IconHeart size={20} />}>
                    お気に入り
                  </Tabs.Tab>
                </Link>

                <Link href="/Setting">
                  <Tabs.Tab value="gallery" icon={<IconSettings size={20} />}>
                    設定
                  </Tabs.Tab>
                </Link>
              </Tabs.List>
            </Tabs>
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
                  <Menu.Item icon={<IconStar size={14} />}>favorite</Menu.Item>
                </Link>

                <Link href="/Setting">
                  <Menu.Item icon={<IconSettings size={14} />}>設定</Menu.Item>
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
