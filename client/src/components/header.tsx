import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";

import Search from "./search.tsx";
import ButtonCustom from "./button.tsx";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import G from "../assets/public/G.png";
const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openProfile = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();
  const hide =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="w-full px-5 phone:px-1 h-20 bg-backgroundLight flex justify-between items-center">
      <Link to="/home" style={{ margin: 10, textDecoration: "none" }}>
        <div className="flex justify-center items-center flex-col">
          <img src={G} className="w-14 h-14 bg-highLight p-1 rounded-md" />
        </div>
      </Link>

      <div className="flex justify-evenly items-center flex-row">
        {hide ? null : (
          <>
            <Search />
            <Link
              to="/add-new"
              className="m-2 decoration-0 tablet:fixed tablet:bottom-5 tablet:right-5 tablet:z-50"
            >
              <ButtonCustom />
            </Link>
          </>
        )}
      </div>
      {hide ? null : (
        <>
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={openProfile ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openProfile ? "true" : undefined}
          >
            <Avatar className="w-13 h-13 bg-highLight">M</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={openProfile}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> My Recipes
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Avatar /> Saved Recipes
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
};

export default Header;
