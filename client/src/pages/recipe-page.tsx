import React, { useEffect, useState } from "react";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Comment } from "../components/comment";
import CategoryCard from "../components/categoryCard";
import {
  Avatar,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/keysToCamelCase";
import { SingleRecipe } from "../types/SingleRecipe";
import { Typography } from "@mui/joy";
import Image from "../components/Image";
import { useParams } from "react-router-dom";

const RecipePage: React.FC = () => {
  const [tableRecords, setTableRecords] = useState<
    { ingredient: string; quantity: string }[]
  >([{ ingredient: "Frozen yoghurt", quantity: "159" }]);

  const { id } = useParams();

  const [timelineItems, setTimelineItems] = useState<string[]>([
    "Eat",
    "Code",
    "Sleep",
    "Eat",
    "Code",
    "Sleep",
    "Eat",
    "Code",
    "Sleep",
    "Eat",
    "Code",
    "Sleep",
  ]);

  const [recipe, setRecipe] = useState<SingleRecipe | null>(null);

  useEffect(() => {
    const response = axios.get(
      `${import.meta.env.VITE_PUBLIC_HOST}/api/v1/recipes/${id}`
    );

    response.then((response) => {
      const data = convertKeysToCamelCase(response.data);

      setRecipe(data[0]);
    });
  }, []);

  console.log(recipe?.name);

  return recipe ? (
    <>
      <div className="flex w-full min-h-screen bg-backgroundLight phone:flex-col flex-row">
        <div className="flex flex-col p-20 tablet:p-5 items-center w-2/4 phone:w-full h-full bg-backgroundLight">
          <div className="flex w-full h-200 rounded-xl">
            {recipe.image ? (
              <Image
                className="mx-auto w-full h-full rounded-full object-cover"
                image={recipe.image}
              />
            ) : (
              <img
                src="https://placehold.co/600x400/png"
                className="w-full h-full rounded-xl"
                alt="asdsad"
              />
            )}
          </div>

          <div className="w-full flex flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-4">
              <Avatar />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Typography className="leading-none">
                    {recipe.author.firstName}
                  </Typography>
                  <Typography className="leading-none">
                    {recipe.author.lastName}
                  </Typography>
                </div>
                <Typography className="leading-none">
                  {recipe.author.username}
                </Typography>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Typography className="leading-none">Rate:</Typography>
              <Rating name="simple-controlled" size="large" precision={0.5} />
              <LinkRoundedIcon className="text-3xl hover:text-highLight" />
              <BookmarkIcon className="text-3xl hover:text-highLight" />
            </div>
          </div>

          <div className="w-full">
            <Timeline>
              {recipe.stepsDetails &&
                recipe.stepsDetails.map((step, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot className="hover:bg-highLight" />
                      {index < timelineItems.length - 1 && (
                        <TimelineConnector />
                      )}
                    </TimelineSeparator>
                    <TimelineContent>{step.description}</TimelineContent>
                  </TimelineItem>
                ))}
            </Timeline>
          </div>
        </div>

        <div className="flex flex-col p-20 tablet:p-5 w-2/4 phone:w-full h-full bg-backgroundLight gap-10">
          <div className="text-textLight text-3xl">{recipe.name}</div>
          {/* <CategoryCard
            imageSource="../public/snack.jpg"
            categoryName="Main Meal"
            circle={true}
          /> */}
          <div>
            <TableContainer
              component={Paper}
              className="bg-secondary shadow-none rounded-lg p-5"
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Ingredient</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recipe.ingredients &&
                    recipe.ingredients.map((ingredient, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {ingredient.product.productName}
                        </TableCell>
                        <TableCell align="right">
                          {ingredient.quantity}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          {recipe.ratings &&
            recipe.ratings.map((rating, index) => {
              return (
                <Comment
                  key={index}
                  raterId={rating.rater.userId}
                  firstName={rating.rater.firstName}
                  lastName={rating.rater.lastName}
                  description={rating.description}
                  rating={rating.rating}
                />
              );
            })}
        </div>
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default RecipePage;
