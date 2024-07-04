import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import CategoryCard from "../components/categoryCard";
import { TextField, Button, Menu, MenuItem } from "@mui/material";
import ImageUploader from "../components/imageUpload.tsx";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

const AddNew: React.FC = () => {
  const [recipeName, setRecipeName] = useState<string>("");
  const [recipeImage, setRecipeImage] = useState<string>("");
  const [recipeProducts, setRecipeProducts] = useState<string>("");
  const [timelineItems, setTimelineItems] = useState<string[]>(["Eat", "Code", "Sleep"]);
  const [newTimelineItem, setNewTimelineItem] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

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

  const handleDotClick = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setEditingIndex(index);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (editingIndex !== null) {
      setTimelineItems(timelineItems.filter((_, index) => index !== editingIndex));
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

  const screen = {
    width: "100%",
    backgroundColor: "#F9F7F3",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const addNewForm = {
    width: "85%",
    paddingTop: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#F9F7F3",
  };

  const title = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "80%",
    backgroundColor: "#F9F7F3",
  };

  const container = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "80%",
    backgroundColor: "#F9F7F3",
  };

  const inputField = {
    borderRadius: 20,
    width: "80%",
    margin: 50,
    backgroundColor: "#F9F7F3",
  };

  return (
    <div style={screen}>
      <div style={addNewForm}>
        <Typography variant="h4">ADD NEW RECIPE</Typography>
        <div style={title}>
          <Typography variant="h5">Select Category</Typography>
        </div>
        <div style={container}>
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
        <div style={title}>
          <Typography variant="h5">Name of the recipe</Typography>
        </div>
        <div style={container}>
          <TextField
            id="outlined-basic"
            label="Recipe Name"
            variant="outlined"
            style={inputField}
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </div>
        <div style={title}>
          <Typography variant="h5">Select an Image</Typography>
        </div>
        <div style={container}>
          <TextField
            id="outlined-basic"
            label="Image URL"
            variant="outlined"
            style={inputField}
            value={recipeImage}
            onChange={(e) => setRecipeImage(e.target.value)}
          />
        </div>
        <div style={title}>
          <Typography variant="h5">Ingredients</Typography>
        </div>
        <div style={container}>
          <ImageUploader />
        </div>
        <div style={title}>
          <Typography variant="h5">Steps</Typography>
        </div>
        <div style={container}>
          <Timeline>
            {timelineItems.map((item, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot onClick={(e) => handleDotClick(e, index)} />
                  {index < timelineItems.length - 1 && <TimelineConnector />}
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
          <TextField
            id="outlined-basic"
            label="New Step"
            variant="outlined"
            style={inputField}
            value={newTimelineItem}
            onChange={(e) => setNewTimelineItem(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleAddTimelineItem}>
            Add Step
          </Button>
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default AddNew;
