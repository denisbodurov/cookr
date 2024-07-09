import { Avatar, Rating } from "@mui/material";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
export const Comment = () => {
  return (
    <div className="flex w-full p-5 tablet:p-2 min-h-40 mb-5 bg-secondary rounded-lg">
      <Avatar className="w-13 h-13 bg-highLight">SO</Avatar>
      <div className="w-full pl-5 tablet:pl-2 bg-secondary">
        <div className="flex flex-wrap justify-between items-center pb-2">
          <div className="flex items-start">
            <h1 className="text-xl font-bold ">RatingComment</h1>
          </div>

          <div className="flex items-center justify-between">
            <Rating name="read-only" value={2} readOnly />
            <DeleteForeverIcon />
          </div>
        </div>

        <h1 className="text-base">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus autem
          officiis, cum nobis esse, soluta voluptatem at enim perspiciatis
          repellendus beatae voluptate eum, reprehenderit dicta blanditiis
          adipisci facilis libero fuga.
        </h1>
      </div>
    </div>
  );
};
