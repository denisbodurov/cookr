import Search from "./search.tsx";
import Drawer from "@mui/material/Drawer";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import ButtonCustom from "./button.tsx";

const Header = () => {
  const headerContainer = {
    width: "100%",
    height: 80,
    backgroundColor: "#F9F7F3",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div style={headerContainer}>
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Search></Search>
        <ButtonCustom onClick={toggleDrawer(true)}></ButtonCustom>
        <div>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            <h1>hadsad</h1>
          </Drawer>
        </div>
      </div>
      <Avatar>H</Avatar>
    </div>
  );
};

export default Header;
