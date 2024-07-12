// CategoryCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

interface CategoryCardProps {
  imageSource: string;
  categoryName: string;
  circle?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  imageSource,
  categoryName,
  circle,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipes?product_type_name=${categoryName}`);
  };

  return (
    <Card
      onClick={handleClick} // Add onClick handler to navigate on card click
      sx={{
        minHeight: circle ? "80px" : "380px",
        width: circle ? "80px" : "320px",
        position: "relative",
        overflow: "hidden",
        borderRadius: circle ? "50%" : "10px",
        "&::after": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 0,
          height: 0,
          backgroundColor: "rgba(0,0,0, 0.4)", // Corrected typo: bgcolor -> backgroundColor
          borderRadius: circle ? "50%" : "10px",
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
          src={`../../public/images/${imageSource}`}
          alt={categoryName}
          style={{
            borderRadius: circle ? "50%" : "10px",
            objectFit: "cover",
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
};

export default CategoryCard;
