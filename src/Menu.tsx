import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ButtonStyle, DrawerElementsStyle } from "./styles";
import { MenuItemInfo } from "./Layout";

type MenuProps = {
  menuItems: MenuItemInfo[];
};
export const BasicMenu: React.FC<MenuProps> = ({ menuItems }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
        sx={{ ...ButtonStyle }}
      >
        Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItems.map((m) => {
          return (
            <MenuItem
              sx={{ ...DrawerElementsStyle }}
              onClick={() => {
                handleClose();
                m.action();
              }}
            >
              {m.label}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};
