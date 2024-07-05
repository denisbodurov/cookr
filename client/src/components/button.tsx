// button.tsx (ButtonCustom component)
import React from "react";
import { Button } from "@mui/material";



const ButtonCustom = () => {
  

  return (
    <Button className="flex justify-center bg-highLight w-36 h-12 text-xs font-bold rounded-xl" variant="contained" >
      ADD NEW RECIPE
    </Button>
  );
};

export default ButtonCustom;
