import { Avatar, Rating } from "@mui/material";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface CommentProps {
  firstName: string;
  lastName: string;
  description: string;
  rating: number;
  raterId: number;
  currentUserId?: number;
}

export const Comment = ({firstName, lastName, description, rating, raterId, currentUserId} : CommentProps) => {
  return (
    <div className="flex w-full p-5 tablet:p-2 min-h-40 mb-5 bg-secondary rounded-lg">
      <Avatar className="w-13 h-13 bg-highLight">{firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()}</Avatar>
      <div className="w-full pl-5 tablet:pl-2 bg-secondary">
        <div className="flex flex-wrap justify-between items-center pb-2">
          <div className="flex items-start">
            <h1 className="text-xl font-bold ">{firstName + " " + lastName}</h1>
          </div>

          <div className="flex items-center justify-between">
            <Rating name="read-only" value={rating} readOnly />
            {currentUserId && currentUserId === raterId && <DeleteForeverIcon />}
          </div>
        </div>

        <h1 className="text-base">
          {description}
        </h1>
      </div>
    </div>
  );
};
