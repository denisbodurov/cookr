import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { convertKeysToCamelCase } from "../helpers/keysToCamelCase.ts";

const AddNew: React.FC = () => {
  //ЗАРЕЖДАНЕ НА ПРОДУКТИТЕ ОТ БАЗАТА - НЕ РАБОТИ !!!
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PUBLIC_HOST}/api/v1/products`
        );
        const data = convertKeysToCamelCase(response.data);
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  //ЗАРЕЖДАНЕ НА КАТЕГОРИИ//
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PUBLIC_HOST}/api/v1/recipe/types`
        );
        const data = convertKeysToCamelCase(response.data);
        console.log(data);
        setRecipeCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  const [recipeCategories, setRecipeCategories] = useState<string[]>([]);
  ////////////////////////////

  //ЗАПАЗВАНЕ НА НОВОТО ИМЕ///
  const [recipeName, setRecipeName] = useState<string>("");
  ////////////////////////////

  //ЗАПАЗВАНЕ НА ДАННИ ЗА НОВ ПРОДУКТ///
  const [newIngredient, setNewIngredient] = useState<string>("");
  const [newUnit, setNewUnit] = useState<string>("");
  const [newQuantity, setNewQuantity] = useState<string>("");

  //ЗАПАЗВАНЕ НА ДАННИТЕ В ЗАПИС///
  const [tableRecords, setTableRecords] = useState<
    { ingredient: string; unit: string; quantity: string }[]
  >([]);
  ////////////////////////////

  //ЗАПАЗВАНЕ НА СНИМКАТА В base64 - НЕ ИЗЛИЗА///
  const [recipeImage, setRecipeImage] = useState<string>("");
  console.log(recipeImage);
  ////////////////////////////

  //ЗАПАЗВАНЕ НА СТЪПКИТЕ///
  const [timelineItems, setTimelineItems] = useState<string[]>([]);

  //НОВИТЕ СТЪПКИ КОИТО СЕ ДОБАВЯТ КЪМ СТАРИТЕ
  const [newTimelineItem, setNewTimelineItem] = useState<string>("");

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleAddRecipe = () => {
    const recipeData = {
      recipeName,
      ingredients: tableRecords,
      image: recipeImage,
      steps: timelineItems,
    };

    console.log(JSON.stringify(recipeData, null, 2));
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
      setNewUnit("");
      setNewQuantity("");
    } else {
      alert("Please enter ingredient and quantity");
    }
  };

  const handleDotClick = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    setEditingIndex(index);
    setEditingText(timelineItems[index]);
  };

  const handleDeleteStep = () => {
    if (editingIndex !== null) {
      const updatedItems = timelineItems.filter(
        (_, index) => index !== editingIndex
      );
      setTimelineItems(updatedItems);
      setEditingIndex(null);
      setEditingText("");
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

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim() !== "") {
      const results = products.filter((product) =>
        product.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleProductSelect = (product: string) => {
    setNewIngredient(product);
    setSearchResults([]);
  };

  const handleSearchClick = () => {
    setIsSearching(!isSearching);
    setSearchResults([]);
    setNewIngredient("");
    setNewQuantity("");
    setNewUnit("");
  };

  return (
    <div className="flex flex-col items-center bg-backgroundLight p-10 tablet:p-2">
      <div className="w-full tablet:w-full flex flex-col items-start my-20 phone:my-2 bg-backgroundLight">
        <Typography
          variant="h4"
          className="text-highLight font-black w-full text-center mb-20"
        >
          ADD NEW RECIPE
        </Typography>
        <div className="flex flex-row phone:flex-col w-full phone:items-center">
          <div className="p-10 phone:p-2 w-2/4 flex phone:w-full border-r-2 phone:border-0 border-highLight">
            <div className="flex bg-backgroundLight flex-col justify-start">
              <div className="flex flex-col items-start w-full my-5 bg-backgroundLight">
                <Typography className="text-3xl text-highLight font-bold">
                  1. Select Category
                </Typography>
              </div>
              <div className="flex justify-center items-center">
                <div className="flex flex-row gap-5 items-center justify-start flex-wrap rounded-md">
                  {recipeCategories.map((category, index) => (
                    <CategoryCard
                      key={index}
                      imageSource={category.imageSource}
                      categoryName={category.categoryName}
                      circle={true}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-start w-full my-5 bg-backgroundLight">
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
              <div className="flex flex-col items-start w-full my-5 bg-backgroundLight">
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
                        <TableCell className="text-left text-2xl tablet:text-base font-bold text-textLight">
                          Ingredient
                        </TableCell>
                        <TableCell className="text-right text-2xl tablet:text-base font-bold text-textLight">
                          Unit
                        </TableCell>
                        <TableCell className="text-right text-2xl tablet:text-base font-bold text-textLight">
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
                <div className="flex w-10/12 mb-10 flex-row rounded-b-xl items-center justify-around bg-secondary">
                  {isSearching ? (
                    <div className="flex flex-row phone:flex-col items-center justify-center">
                      <TextField
                        id="outlined-basic"
                        label="Product"
                        variant="outlined"
                        className="rounded m-3 bg-backgroundLight relative"
                        value={newIngredient}
                        onChange={(e) => {
                          setNewIngredient(e.target.value);
                          handleSearch(e.target.value);
                        }}
                      />
                      {searchResults.length > 0 && (
                        <div className="absolute bg-backgroundLight shadow-lg rounded-lg w-40 p-2 z-10">
                          {searchResults.map((result, index) => (
                            <div
                              key={index}
                              className="cursor-pointer p-2 hover:bg-secondary rounded-lg"
                              onClick={() => handleProductSelect(result)}
                            >
                              {result}
                            </div>
                          ))}
                        </div>
                      )}
                      <TextField
                        id="outlined-basic"
                        label="Unit"
                        variant="outlined"
                        className="rounded m-3 bg-backgroundLight"
                        value={newUnit}
                        onChange={(e) => setNewUnit(e.target.value)}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Quantity"
                        variant="outlined"
                        className="rounded m-3 bg-backgroundLight"
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(e.target.value)}
                      />
                      <CancelIcon
                        onClick={handleSearchClick}
                        className="cursor-pointer m-2 text-highLight"
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
                  onClick={handleAddRecord}
                  className="mb-5 h-10 rounded-lg bg-highLight text-backgroundLight font-bold text-base self-center"
                >
                  ADD NEW INGREDIENT
                </Button>
              </div>

              <div className="flex flex-col items-start w-full my-5 bg-backgroundLight">
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
            <div className="flex flex-col items-start w-full my-5 bg-backgroundLight">
              <Typography className="text-3xl text-highLight font-bold">
                5. Upload Photo
              </Typography>
            </div>
            <div className="flex flex-row items-center justify-center flex-wrap w-full p-5 bg-backgroundLight">
              <ImageUploader onImageUpload={() => setRecipeImage} />
            </div>
            <div className="flex flex-col items-start w-full my-5 bg-backgroundLight">
              <Typography className="text-3xl text-highLight font-bold">
                Steps
              </Typography>
            </div>
            <div className="flex flex-row items-start justify-start flex-wrap w-full bg-backgroundLight">
              <Timeline className="phone:flex phone:justify-start phone:items-start">
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
                        <div className="flex justify-center items-center flex-col">
                          <TextField
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                          />
                          <div className="flex justify-center items-center">
                            <Button
                              className="bg-highLight m-2 w-20 p-2 h-10 rounded-lg text-backgroundLight hover:shadow-lg"
                              onClick={handleSaveEdit}
                            >
                              Save
                            </Button>
                            <Button
                              className="bg-[#DB324D] m-2 w-20 p-2 h-10 rounded-lg text-backgroundLight hover:shadow-lg"
                              onClick={handleDeleteStep}
                            >
                              Delete
                            </Button>
                          </div>
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
