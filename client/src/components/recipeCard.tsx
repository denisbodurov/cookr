import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import { Avatar, Rating } from "@mui/material";
import { useEffect, useState } from "react";

export default function RecipeCard({
  recipeId,
  recipeName,
  firstName,
  lastName,
  username,
  userImage,
  recipeImage,
  rating,
}: {
  recipeId: number;
  recipeName: string;
  firstName: string;
  lastName: string;
  username: string;
  userImage: string;
  recipeImage: string;
  rating: number;
}) {
  const [recipeImageSrc, setRecipeImageSrc] = useState("");
  const [userImageSrc, setUserImageSrc] = useState("");
  useEffect(() => {
    if (recipeImage) {
      const byteCharacters = atob(recipeImage);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });
      const recipeURL = URL.createObjectURL(blob);
      setRecipeImageSrc(recipeURL);
    }
  }, [recipeImage]);
  useEffect(() => {
    if (userImage) {
      const byteCharacters = atob(userImage);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });
      const userURL = URL.createObjectURL(blob);
      setUserImageSrc(userURL);
    }
  }, [userImage]);
  return (
    <Card sx={{ width: 320, height: 350 }}>
      <div>
        <Typography level="title-lg">{recipeName}</Typography>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
        >
          <BookmarkAdd />
        </IconButton>
      </div>
      <AspectRatio minHeight="220px" maxHeight="220px">
        <img src={recipeImageSrc} loading="lazy" alt="" />
      </AspectRatio>
      <CardContent className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <Avatar alt={username} src={userImageSrc} />
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <Typography className="leading-none">{firstName}</Typography>
              <Typography className="leading-none">{lastName}</Typography>
            </div>
            <Typography className="leading-none font">{username}</Typography>
          </div>
        </div>
        <Rating
          name="simple-controlled"
          size="small"
          value={rating}
          precision={0.5}
          readOnly
        />
      </CardContent>
    </Card>
  );
}
