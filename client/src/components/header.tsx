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
import { Link } from "react-router-dom";

const Header = () => {
  const headerContainer = {
    width: "100%",
    height: 80,
    backgroundColor: "#F9F7F3",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openProfile = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={headerContainer}>
      <Link to="/" style={{ margin: 10, textDecoration: 'none' }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <img src="../public/zz.svg" alt="" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              margin: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: "bolder",
              fontSize: 25,
              color: "#E56B6F",
              textDecoration: "none",
            }}
          >
            COOKR
          </Typography>
        </div>
      </Link>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Search />

        <Link to="/addNew" style={{ margin: 10, textDecoration: 'none'}}>
          <ButtonCustom />
        </Link>
      </div>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={openProfile ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openProfile ? "true" : undefined}
      >
        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
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
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
