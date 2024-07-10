import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ImageUploader from "../components/imageUploader.tsx";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

const AddNew: React.FC = () => {
  const [recipeName, setRecipeName] = useState<string>("");
  const [timelineItems, setTimelineItems] = useState<string[]>([]);
  const [newTimelineItem, setNewTimelineItem] = useState<string>("");
  const [tableRecords, setTableRecords] = useState<
    { ingredient: string; quantity: string }[]
  >([{ ingredient: "Frozen yoghurt", quantity: "159" }]);
  const [newIngredient, setNewIngredient] = useState<string>("");
  const [newQuantity, setNewQuantity] = useState<string>("");

  const handleAddRecipe = () => {
    console.log("Adding Recipe:", { recipeName, timelineItems, tableRecords });
    setRecipeName("");
    setTimelineItems([]);
    setTableRecords([]);
  };

  const handleAddTimelineItem = () => {
    if (newTimelineItem.trim() !== "") {
      setTimelineItems([...timelineItems, newTimelineItem]);
      setNewTimelineItem("");
    } else {
      alert("Please enter a step description");
    }
  };

  const handleAddRecord = () => {
    if (newIngredient.trim() !== "" && newQuantity.trim() !== "") {
      setTableRecords([
        ...tableRecords,
        { ingredient: newIngredient, quantity: newQuantity },
      ]);
      setNewIngredient("");
      setNewQuantity("");
    } else {
      alert("Please enter an ingredient and quantity");
    }
  };

  const handleDeleteTimelineItem = (index: number) => {
    const updatedItems = [...timelineItems];
    updatedItems.splice(index, 1);
    setTimelineItems(updatedItems);
  };

  return (
    <div className="flex flex-col items-center bg-backgroundLight p-10 phone:p-2">
      <div className="w-full tablet:w-full flex flex-col items-start my-20 phone:my-2 bg-backgroundLight">
        <Typography
          variant="h4"
          className="text-textLight w-full text-center mb-20"
        >
          ADD NEW RECIPE
        </Typography>
        <div className="flex flex-row phone:flex-col w-full phone:items-center ">
          <div className="p-10 phone:p-2 w-2/4 flex phone:w-full">
            <div className="flex bg-backgroundLight flex-col justify-start">
              <div className="flex flex-col items-start w-full my-5 bg-backgroundLight">
                <Typography className="text-3xl">1. Select Category</Typography>
                {/* Category selection cards go here */}
              </div>
              <div className="flex items-start justify-start flex-wrap w-full bg-backgroundLight">
                <TextField
                  id="outlined-basic"
                  label="Recipe Name"
                  variant="outlined"
                  className="rounded-3xl w-full m-3 bg-backgroundLight"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start w-full my-5 bg-backgroundLight">
                <Typography className="text-3xl">
                  3. Select Ingredients
                </Typography>
              </div>
              <div className="flex flex-row items-center justify-center flex-wrap w-full py-3 bg-secondary rounded-md shadow-md mb-2">
                <TableContainer
                  component={Paper}
                  className="bg-secondary rounded-none shadow-none p-5"
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
                <div className="flex flex-row rounded-b-xl bg-secondary">
                  <TextField
                    id="outlined-basic"
                    label="New Ingredient"
                    variant="outlined"
                    className="w-full rounded m-3 bg-backgroundLight"
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Quantity"
                    variant="outlined"
                    className="w-full rounded m-3 bg-backgroundLight"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                  />
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddRecord}
                  className="w-5/6 m-3"
                >
                  ADD NEW INGREDIENT
                </Button>
              </div>

              <div className="flex flex-col items-start w-full my-5 bg-backgroundLight">
                <Typography className="text-3xl">4. Set Steps</Typography>
              </div>
              <div className="flex flex-row items-start justify-start flex-wrap w-full bg-backgroundLight">
                <TextField
                  id="outlined-basic"
                  label="New Step"
                  variant="outlined"
                  className="rounded-3xl w-full m-3 bg-backgroundLight"
                  value={newTimelineItem}
                  onChange={(e) => setNewTimelineItem(e.target.value)}
                />
                <div className="flex flex-row items-center justify-center flex-wrap w-full bg-backgroundLight">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddTimelineItem}
                    className="m-3"
                  >
                    Add Step
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-10 phone:p-2 w-2/4 phone:w-full">
            <div className="flex flex-col items-start w-full my-5 bg-backgroundLight">
              <Typography className="text-3xl">5. Upload Photo</Typography>
            </div>
            <div className="flex flex-row items-center justify-center flex-wrap w-full p-5 bg-backgroundLight">
              <ImageUploader />
            </div>
            <div className="flex flex-col items-start w-full my-5 bg-backgroundLight">
              <Typography className="text-3xl">Steps</Typography>
            </div>
            <div className="flex flex-row items-center justify-center flex-wrap w-full bg-backgroundLight">
              <Timeline>
                {timelineItems.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot
                        onClick={() => handleDeleteTimelineItem(index)}
                      />
                      {index < timelineItems.length - 1 && (
                        <TimelineConnector />
                      )}
                    </TimelineSeparator>
                    <TimelineContent>{item}</TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </div>
          </div>
        </div>
        {/* Button to add recipe */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddRecipe}
          className="m-3"
        >
          Add Recipe
        </Button>
      </div>
    </div>
  );
};

export default AddNew;
