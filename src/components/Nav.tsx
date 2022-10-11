import {
  ActionIcon,
  Burger,
  HoverCard,
  Menu,
  Tabs,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconDeviceTv,
  IconHeart,
  IconHome,
  IconMoonStars,
  IconMovie,
  IconSearch,
  IconSettings,
  IconStar,
  IconSun,
} from "@tabler/icons";
import Link from "next/link";
import { useEffect, useState } from "react";

const Nav = () => {
  const [isMenu, setIsMenu] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  useEffect(() => {
    const Width = window.outerWidth;
    if (Width < 810) {
      setIsMenu(true);
    } else {
      setIsMenu(false);
    }
  }, []);

  return (
    <div className="flex  gap-x-7 items-center cursor-pointer  ">
      <Link href="/">
        <h1 className="font-bold text-2xl ">Movies</h1>
      </Link>
      <div className="flex mt-2">
        {isMenu === false ? (
          <div className="flex gap-x-3 items-center ">
            <Tabs defaultValue="gallery">
              <Tabs.List>
                <Link href="/">
                  <Tabs.Tab
                    value="ホーム"
                    icon={<IconHome size={20} />}
                    className=""
                  >
                    ホーム
                  </Tabs.Tab>
                </Link>

                <Link href="/tv/1">
                  <Tabs.Tab
                    value="TV"
                    icon={<IconDeviceTv size={20} />}
                    className=""
                  >
                    TV
                  </Tabs.Tab>
                </Link>

                <Link href="/Search">
                  <Tabs.Tab
                    value="Search"
                    icon={<IconSearch size={20} />}
                    className=""
                  >
                    検索
                  </Tabs.Tab>
                </Link>

                <Link href="/favorite">
                  <Tabs.Tab
                    value="お気に入り"
                    icon={<IconHeart size={20} />}
                    className=""
                  >
                    お気に入り
                  </Tabs.Tab>
                </Link>

                <Link href="/Setting">
                  <Tabs.Tab
                    value="設定"
                    icon={<IconSettings size={20} />}
                    className=""
                  >
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
                  <Menu.Item icon={<IconSettings size={14} />}>
                    Setting
                  </Menu.Item>
                </Link>
                <Menu.Divider />
              </Menu.Dropdown>
            </Menu>
          </>
        )}

        {/* ダークモード　ライトモード切り替え */}
        <HoverCard width={80} shadow="md">
          <HoverCard.Target>
            <ActionIcon
              variant="outline"
              color={dark ? "yellow" : "blue"}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
              className="mt-1 ml-4 "
            >
              {dark ? <IconSun size={20} /> : <IconMoonStars size={20} />}
            </ActionIcon>
          </HoverCard.Target>

          <HoverCard.Dropdown className="bg-black border border-black">
            <Text size="sm" className="text-blue-200">
              Ctrl + j
            </Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </div>
    </div>
  );
};

export default Nav;
