import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import CategoryCard from "../components/categoryCard";
import { TextField, Button, Menu, MenuItem } from "@mui/material";
import ImageUploader from "../components/imageUpload.tsx";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const AddNew: React.FC = () => {
  const [recipeName, setRecipeName] = useState<string>("");
  const [recipeImage, setRecipeImage] = useState<string>("");
  const [recipeProducts, setRecipeProducts] = useState<string>("");
  const [timelineItems, setTimelineItems] = useState<string[]>([
    "Eat",
    "Code",
    "Sleep",
  ]);
  const [newTimelineItem, setNewTimelineItem] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [newIngredient, setNewIngredient] = useState<string>("");
  const [newQuantity, setNewQuantity] = useState<string>("");
  const [tableRecords, setTableRecords] = useState<
    { ingredient: string; quantity: string }[]
  >([{ ingredient: "Frozen yoghurt", quantity: "159" }]);

  const handleAddRecipe = () => {
    console.log("Adding Recipe:", { recipeName, recipeImage, recipeProducts });
    setRecipeName("");
    setRecipeImage("");
    setRecipeProducts("");
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
      alert("Please enter a step description");
    }
  };

  const handleDotClick = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    setAnchorEl(event.currentTarget);
    setEditingIndex(index);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (editingIndex !== null) {
      setTimelineItems(
        timelineItems.filter((_, index) => index !== editingIndex)
      );
      setAnchorEl(null);
      setEditingIndex(null);
    }
  };

  const handleEdit = () => {
    if (editingIndex !== null) {
      setEditingText(timelineItems[editingIndex]);
      setAnchorEl(null);
    }
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const updatedItems = [...timelineItems];
      updatedItems[editingIndex] = editingText;
      setTimelineItems(updatedItems);
      setEditingIndex(null);
      setEditingText("");
    }
  };

  function createData(name: string, calories: number) {
    return { name, calories };
  }

  return (
    <div className="flex flex-col items-center bg-backgroundLight">
      <div className="w-3/4 flex flex-col items-start my-20 bg-backgroundLight">
        <Typography
          variant="h4"
          className="text-textLight w-full text-center mb-20"
        >
          ADD NEW RECIPE
        </Typography>
        <div className="flex flex-row w-full">
          <div className="p-10 w-2/4 flex">
            <div className="flex bg-backgroundLight flex-col justify-start ">
              <div className="flex flex-col items-start w-full my-5 bg-backgroundLight ">
                <Typography className="text-3xl">1. Select Category</Typography>
              </div>
              <div className="flex flex-row items-center justify-center flex-wrap w-full py-3 bg-secondary rounded-md shadow-md mb-2">
                <CategoryCard
                  imageSource="../public/snack.jpg"
                  categoryName="SNACKS"
                  circle={true}
                />
                <CategoryCard
                  imageSource="../public/snack.jpg"
                  categoryName="SNACKS"
                  circle={true}
                />
                <CategoryCard
                  imageSource="../public/snack.jpg"
                  categoryName="SNACKS"
                  circle={true}
                />
                <CategoryCard
                  imageSource="../public/snack.jpg"
                  categoryName="SNACKS"
                  circle={true}
                />
                <CategoryCard
                  imageSource="../public/snack.jpg"
                  categoryName="SNACKS"
                  circle={true}
                />
                <CategoryCard
                  imageSource="../public/snack.jpg"
                  categoryName="SNACKS"
                  circle={true}
                />
              </div>
              <div className="flex flex-col items-start w-full my-5 bg-backgroundLight ">
                <Typography className="text-3xl">2. Set Name</Typography>
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
              <div className="flex flex-col items-start w-full my-5 bg-backgroundLight ">
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

              <div className="flex flex-col items-start w-full my-5 bg-backgroundLight ">
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
                  >
                    Add Step
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-10 w-2/4">
            <div className="flex flex-col items-start w-full my-5 bg-backgroundLight ">
              <Typography className="text-3xl">5. Upload Photo</Typography>
            </div>
            <div className="flex flex-row items-center justify-center flex-wrap w-5/6 p-5 bg-backgroundLight">
              <ImageUploader />
            </div>
            <div className="flex flex-col items-start w-full my-5 bg-backgroundLight ">
                <Typography className="text-3xl">Steps</Typography>
              </div>
            <div className="flex flex-row items-center justify-center flex-wrap  w-5/6 bg-backgroundLight">
              <Timeline>
                {timelineItems.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot onClick={(e) => handleDotClick(e, index)} />
                      {index < timelineItems.length - 1 && (
                        <TimelineConnector />
                      )}
                    </TimelineSeparator>
                    <TimelineContent>
                      {editingIndex === index ? (
                        <div>
                          <TextField
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                          />
                          <Button onClick={handleSaveEdit}>Save</Button>
                        </div>
                      ) : (
                        item
                      )}
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNew;
