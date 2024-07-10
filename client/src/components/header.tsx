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

import Search from "./search.tsx";
import ButtonCustom from "./button.tsx";
import { Logout } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/public/images/logo.png";
import { useAuth } from "../provider/AuthProvider.tsx";

const Header = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openProfile = Boolean(anchorEl);
  const location = useLocation();
  const hide = location.pathname === "/login" || location.pathname === "/register";

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
    <Grid container alignItems="center" justifyContent="space-between" className="w-full px-5 phone:px-1 h-20 bg-backgroundLight sticky bottom-0 bg-white py-4 border-t border-gray-200">
      <Grid item>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Avatar src={logo} alt="Logo" className="w-14 h-14 bg-highLight p-1 rounded-md" />
        </Link>
      </Grid>

      {!hide && (
        <Grid item>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Search />
            </Grid>
            <Grid item>
              <Link to="/add-new" className="m-2 decoration-0 tablet:fixed tablet:bottom-5 tablet:right-5 tablet:z-50">
                <ButtonCustom />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      )}

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
              <Avatar className="bg-highLight">M</Avatar>
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
                <ListItemIcon>
                  <Avatar /> My Recipes
                </ListItemIcon>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Avatar /> Saved Recipes
                </ListItemIcon>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleSignOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Header;
