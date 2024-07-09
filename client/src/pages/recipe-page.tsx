import React, { useState } from "react";
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

const RecipePage: React.FC = () => {
  const [tableRecords, setTableRecords] = useState<
    { ingredient: string; quantity: string }[]
  >([{ ingredient: "Frozen yoghurt", quantity: "159" }]);

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
  return (
    <>
      <div className="flex w-full min-h-screen bg-backgroundLight phone:flex-col flex-row">
        <div className="flex flex-col p-20 tablet:p-5 items-center w-2/4 phone:w-full h-full bg-backgroundLight">
          <div className="flex w-full  rounded-xl">
            <img
              src="https://placehold.co/600x400/png"
              className="w-full h-full rounded-xl"
              alt="asdsad"
            />
          </div>

          <div className="flex justify-between w-full p-5 mb-10">
            <Avatar className="w-13 h-13 bg-highLight">M</Avatar>
            <Rating name="simple-controlled" size="large" value={2} precision={0.5} />
            <LinkRoundedIcon className="text-3xl hover:text-highLight" />
            <BookmarkIcon className="text-3xl hover:text-highLight" />
          </div>

          <div className="w-full">
            <Timeline>
              {timelineItems.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot className="hover:bg-highLight" />
                    {index < timelineItems.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>{item}</TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </div>

        <div className="flex flex-col p-20 tablet:p-5 w-2/4 phone:w-full h-full bg-backgroundLight gap-10">
          <div className="text-textLight text-3xl">Product's Name</div>
          <CategoryCard
            imageSource="../public/snack.jpg"
            categoryName="Main Meal"
            circle={true}
          />
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
                  {tableRecords.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {record.ingredient}
                      </TableCell>
                      <TableCell align="right">{record.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Comment />
          <Comment />
        </div>
      </div>
    </>
  );
};

export default RecipePage;
