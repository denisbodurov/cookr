import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

interface CategoryCardProps {
  imageSource: string;
  categoryName: string;
  circle?: boolean; // Optional prop for circle shape
}

export default function CategoryCard({
  imageSource,
  categoryName,
  circle,
}: CategoryCardProps) {
  return (
    <Card
      sx={{
        minHeight: circle ? "80px" : "380px", // Adjust the height for rectangular card
        width: circle ? "80px" : "320px", // Adjust the width for rectangular card
        position: "relative",
        overflow: "hidden",
        borderRadius: circle ? "50%" : "10px", // Apply circle border radius if circle prop is true
        "&::after": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 0,
          height: 0,
          bgcolor: "rgba(0,0,0, 0.4)",
          borderRadius: circle ? "50%" : "10px", // Apply circle border radius to pseudo-element if circle prop is true
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s ease, height 0.3s ease",
        },
        "&:hover::after": {
          width: "100%",
          height: "100%",
        },
        "&:hover .content": {
          opacity: 1,
          cursor: "pointer",
        },
      }}
    >
      <CardCover>
        <img
          src={imageSource}
          alt={categoryName}
          style={{
            borderRadius: circle ? "50%" : "10px", // Apply circle border radius to image if circle prop is true

            objectFit: "cover", // Maintain aspect ratio and cover image inside the container
          }}
        />
      </CardCover>
      <CardCover
        sx={{
          background: circle
            ? "rgba(0,0,0, 0.4)"
            : "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
        }}
      />
      <CardContent
        className="content"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          transition: "opacity 0.3s ease",
          textAlign: "center",
        }}
      >
        <Typography
          level="title-lg"
          textColor="#fff"
          sx={{
            fontSize: circle ? "12px" : "32px",
          }}
        >
          {categoryName}
        </Typography>
      </CardContent>
    </Card>
  );
}
