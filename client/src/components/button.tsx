// button.tsx (ButtonCustom component)
import React from "react";
import { Button } from "@mui/material";



const ButtonCustom = () => {
  const buttonStyle = {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#E56B6F",
    width: 150,
    height: 50,
    fontSize: 12,
    fontWeight: "bold",
    borderRadius: 10,
  };

  return (
    <Button style={buttonStyle} variant="contained" >
      ADD NEW RECIPE
    </Button>
  );
};

export default ButtonCustom;
