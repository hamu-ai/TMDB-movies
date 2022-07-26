import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";

const Nav = () => {
  const [menu, setMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      const dd = window.outerWidth;
      if (dd < 630) {
        setMenu(true);
      } else {
        setMenu(false);
      }
    });
  }, []);

  return (
    <div className="flex flex-1 gap-x-7  ">
      <Link href="/">
        <h1 className="font-bold text-2xl cursor-pointer ">Movies</h1>
      </Link>
      <div className="flex  mt-2 ">
        {menu === false ? (
          <Link href="/favorite">
            <h1 className="text-red-700 font-bold cursor-pointer ">
              お気に入り一覧
            </h1>
          </Link>
        ) : (
          <>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              className="!text-white !bg-black !bg-opacity-50 "
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link href="favorite">
                  <p> お気に入り一覧</p>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>ホーム</MenuItem>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
