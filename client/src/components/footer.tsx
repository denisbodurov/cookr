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

const Footer = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openProfile = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-full phone:gap-10 h-auto px-20 pt-5 pb-2 
    dark:bg-taskify-lightBlue bg-backgroundLight"
    >
      <div className="w-full pb-10 phone:pb-0 flex flex-row phone:flex-col gap-10 items-center justify-between">
        <div className="flex flex-row items-center justify-center drop-shadow">
          <img
            src="assets/logo.svg"
            alt="Logo"
            width={75}
            className="mr-3 smallphone:w-10"
          />
          <h1 className="text-4xl smallphone:text-3xl text-taskify-lightBlue dark:text-taskify-lightBackground">
            COOKR
          </h1>
          <button
            className="w-10 h-10 m-3 drop-shadow rounded-2xl text-base flex justify-center items-center
            bg-taskify-Green taskify-DarkBlue-text "
          ></button>
        </div>
        <div className="flex flex-row gap-4 drop-shadow">
          <a href="https://facebook.com">
            <img
              src="assets/facebookLogo.png"
              alt="Image 1"
              width={35}
              height={35}
            />
          </a>
          <a href="https://x.com">
            <img src="assets/xLogo.png" alt="Image 2" width={35} height={35} />
          </a>
          <a href="https://instagram.com">
            <img
              src="assets/instagramLogo.png"
              alt="Image 3"
              width={35}
              height={35}
            />
          </a>
        </div>
      </div>
      <div className="text-xs text-center dark:text-taskify-lightBackground taskify-DarkBlue-text">
        <p>Copyright © 2023 ZettaHosting | Всички права запазени</p>
      </div>
    </div>
  );
};

export default Footer;
