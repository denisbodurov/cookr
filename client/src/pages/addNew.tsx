import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import CategoryCard from "../components/categoryCard";
import { TextField, Button } from "@mui/material";
import ImageUploader from "../components/imageUploader.tsx";
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
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";

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
    { ingredient: string; unit: string; quantity: string }[]
  >([{ ingredient: "Frozen yoghurt", unit: "2", quantity: "159" }]);

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
        { ingredient: newIngredient, unit: newUnit, quantity: newQuantity },
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
  const [isSearching, setIsSearching] = useState(false);
  const handleSearchClick = () => {
    setIsSearching(!isSearching);
  };

  return (
    <div className="flex flex-col items-center bg-backgroundLight p-10 phone:p-2">
      <div className="w-full tablet:w-full flex flex-col items-start my-20 phone:my-2 bg-backgroundLight">
        <Typography
          variant="h4"
          className="text-highLight font-black w-full text-center mb-20"
        >
          ADD NEW RECIPE
        </Typography>
        <div className="flex flex-row phone:flex-col w-full phone:items-center ">
          <div className="p-10 phone:p-2 w-2/4 flex phone:w-full border-r-2 phone:border-0 border-highLight">
            <div className="flex bg-backgroundLight flex-col justify-start  ">
              <div className="flex flex-col items-start w-full my-5 bg-backgroundLight ">
                <Typography className="text-3xl text-highLight font-bold">
                  1. Select Category
                </Typography>
              </div>
              <div className="flex justify-center items-center">
                <div className="flex flex-row gap-5 items-center justify-start flex-wrap rounded-md">
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
              </div>
              <div className="flex flex-col items-start w-full my-5 bg-backgroundLight ">
                <Typography className="text-3xl text-highLight font-bold">
                  2. Set Name
                </Typography>
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
                <Typography className="text-3xl text-highLight font-bold">
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
                        <TableCell className="text-left text-2xl font-bold text-textLight">
                          Ingredient
                        </TableCell>
                        <TableCell className="text-right text-2xl font-bold text-textLight">
                          Unit
                        </TableCell>
                        <TableCell className="text-right text-2xl font-bold text-textLight">
                          Quantity
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableRecords.map((record, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {record.ingredient}
                          </TableCell>
                          <TableCell align="right">{record.unit}</TableCell>
                          <TableCell align="right">{record.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="flex w-10/12 mb-10 flex-row rounded-b-xl items-center justify-center bg-secondary">
                  {isSearching ? (
                    <div className="flex flex-row items-center justify-center">
                      <TextField
                        id="outlined-basic"
                        label="Product"
                        variant="outlined"
                        className=" rounded m-3 bg-backgroundLight"
                        value={newIngredient}
                        onChange={(e) => setNewQuantity(e.target.value)}
                      />
                      <input
                        type="number"
                        className="w-10 h-12 rounded-lg p-1"
                        name=""
                        id=""
                      />
                      <CancelIcon
                        onClick={handleSearchClick}
                        className="cursor-pointer"
                      />
                    </div>
                  ) : (
                    <Button
                      variant="contained"
                      endIcon={<SearchIcon />}
                      onClick={handleSearchClick}
                      className="h-10 rounded-lg bg-highLight text-backgroundLight font-bold text-base self-center"
                    >
                      FIND PRODUCT
                    </Button>
                  )}
                </div>

                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  className="mb-5 h-10 rounded-lg bg-highLight text-backgroundLight font-bold text-base self-center"
                >
                  ADD NEW INGREDIENT
                </Button>
              </div>

              <div className="flex flex-col items-start w-full my-5 bg-backgroundLight ">
                <Typography className="text-3xl text-highLight font-bold">
                  4. Set Steps
                </Typography>
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
                    onClick={handleAddTimelineItem}
                    endIcon={<ArrowForwardIcon />}
                    className="mb-5 w-48 h-10 rounded-lg bg-highLight text-backgroundLight font-bold text-base self-center"
                  >
                    ADD STEPS
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-10 phone:p-2 w-2/4 phone:w-full">
            <div className="flex flex-col items-start w-full my-5 bg-backgroundLight ">
              <Typography className="text-3xl text-highLight font-bold">
                5. Upload Photo
              </Typography>
            </div>
            <div className="flex flex-row items-center justify-center flex-wrap w-full p-5 bg-backgroundLight">
              <ImageUploader onImageUpload={() => console.log("Hello")} />
            </div>
            <div className="flex flex-col items-start w-full my-5 bg-backgroundLight ">
              <Typography className="text-3xl text-highLight font-bold">
                Steps
              </Typography>
            </div>
            <div className="flex flex-row items-center justify-center flex-wrap  w-full bg-backgroundLight">
              <Timeline>
                {timelineItems.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot
                        className="hover:bg-highLight shadow-none hover:shadow-md cursor-pointer"
                        onClick={(e) => handleDotClick(e, index)}
                      />
                      {index < timelineItems.length - 1 && (
                        <TimelineConnector className="bg-highLight" />
                      )}
                    </TimelineSeparator>
                    <TimelineContent className="text-highLight font-bold">
                      {editingIndex === index ? (
                        <div>
                          <TextField
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                          />
                          <Button onClick={handleSaveEdit}>Save</Button>
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

        <Button
          variant="contained"
          onClick={handleAddRecipe}
          endIcon={<AddIcon />}
          className="mb-5 w-48 h-10 rounded-lg bg-highLight text-backgroundLight font-bold text-base self-center"
        >
          ADD RECIPE
        </Button>
      </div>
    </div>
  );
};

export default AddNew;
