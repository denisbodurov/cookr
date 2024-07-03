// button.tsx (ButtonCustom component)
import React from "react";
import { Button } from "@mui/material";

interface ButtonCustomProps {
  onClick: () => void; // Define onClick prop as a function that takes no arguments
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({ onClick }) => {
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
    <Button style={buttonStyle} variant="contained" onClick={onClick}>
      ADD NEW RECIPE
    </Button>
  );
};

export default ButtonCustom;
