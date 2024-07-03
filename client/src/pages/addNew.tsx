import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddNew: React.FC = () => {
  const [recipeName, setRecipeName] = useState<string>('');
  const [recipeImage, setRecipeImage] = useState<string>('');
  const [recipeProducts, setRecipeProducts] = useState<string>('');

  const handleAddRecipe = () => {
    console.log('Adding Recipe:', { recipeName, recipeImage, recipeProducts });
    setRecipeName('');
    setRecipeImage('');
    setRecipeProducts('');
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Add New Recipe
      </Typography>
      <TextField
        label="Recipe Name"
        fullWidth
        margin="normal"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
      />
      <TextField
        label="Image URL"
        fullWidth
        margin="normal"
        value={recipeImage}
        onChange={(e) => setRecipeImage(e.target.value)}
      />
      <TextField
        label="Products (comma separated)"
        fullWidth
        margin="normal"
        value={recipeProducts}
        onChange={(e) => setRecipeProducts(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddRecipe}
        style={{ marginTop: 20 }}
      >
        Add Recipe
      </Button>
    </div>
  );
};

export default AddNew;
