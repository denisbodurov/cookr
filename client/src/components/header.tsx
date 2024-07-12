import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Grid,
} from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import PersonIcon from "@mui/icons-material/Person";

import Search from "./search.tsx";
import ButtonCustom from "./button.tsx";
import Image from "./Image.tsx";
import { Logout } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../provider/AuthProvider.tsx";

const Header = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [query, setQuery] = useState<string>("");
  const openProfile = Boolean(anchorEl);
  const location = useLocation();
  const hide =
    location.pathname === "/login" || location.pathname === "/register";

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    setAnchorEl(null);
    signOut();
    navigate("/login");
  };

  return (
    <Grid
      container
      className="w-full px-5 phone:px-1 h-20 bg-backgroundLight flex flex-row flex-nowrap justify-between items-center"
    >
      <Grid item>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Avatar
            src={logo}
            alt="Logo"
            className="w-14 h-14 bg-highLight p-1 rounded-md"
          />
        </Link>
      </Grid>
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
      {!hide && (
        <>
          <Grid item>
            <IconButton
              onClick={handleClick}
              size="small"
              aria-label="account"
              aria-controls={openProfile ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openProfile ? "true" : undefined}
            >
              <Avatar className={user ? "relative" : "bg-highLight"}>
                {user ? (
                  user.image ? (
                    <Image className="" image={user.image} />
                  ) : (
                    user.firstName.charAt(0).toUpperCase() +
                    user.lastName.charAt(0).toUpperCase()
                  )
                ) : null}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openProfile}
              onClose={handleClose}
              slotProps={{
                paper: {
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
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {user && (
                <>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon className="flex gap2">
                      <PersonIcon />
                    </ListItemIcon>
                    <Typography>Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon className="flex gap2">
                      <ReceiptLongIcon />
                    </ListItemIcon>
                    <Typography>My Recipes</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon className="flex gap2">
                      <BookmarkAddedIcon />
                    </ListItemIcon>
                    <Typography>Saved Recipes</Typography>
                  </MenuItem>
                  <Divider />
                </>
              )}

              <MenuItem onClick={handleSignOut}>
                <ListItemIcon className="flex gap2">
                  <Logout fontSize="small" />
                </ListItemIcon>
                {user ? "Logout" : "Login"}
              </MenuItem>
            </Menu>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Header;
