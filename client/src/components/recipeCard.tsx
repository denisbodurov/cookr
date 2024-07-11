import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import { Avatar, Rating } from "@mui/material";

export default function RecipeCard({
  recipeName,
  firstName,
  lastName,
  userName,
  userImg,
  rating,
}: {
  recipeName: string;
  firstName: string;
  lastName: string;
  userName: string;
  userImg: string;
  rating: number;
}) {
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
        <img
          src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
          srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <Avatar alt="Remy Sharp" src={userImg} />
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <Typography className="leading-none">{firstName}</Typography>
              <Typography className="leading-none">{lastName}</Typography>
            </div>
            <Typography className="leading-none font-bold">{userName}</Typography>
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
