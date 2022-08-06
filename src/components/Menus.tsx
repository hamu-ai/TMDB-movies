import { Button, Menu } from "@mui/material";
import { FC, ReactNode, useState } from "react";

type Props = {
  props: ReactNode;
  Icons?: ReactNode;
  style?: ReactNode;
};

const Mueus: FC<Props> = ({ props, Icons, style }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={`!text-white  ${style}`}
      >
        {Icons}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        onClick={() => setAnchorEl(null)}
      >
        {props}
      </Menu>
    </div>
  );
};

export default Mueus;
