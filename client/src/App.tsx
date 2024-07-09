import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home.tsx";
import AddNew from "./pages/addNew.tsx";
import Login from "./pages/login.tsx";
import Register from "./pages/register.tsx";
import Header from "./components/header.tsx";
import Footer from "./components/footer.tsx";
import RecipePage from "./pages/recipe-page.tsx";
import AllRecipes from "./pages/all-recipes.tsx";
import ProfilePage from "./pages/profile-page.tsx";
const App: React.FC = () => {
  
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-new" element={<AddNew />} />
          <Route path="/recipe-page" element={<RecipePage />} />
          <Route path="/all-recipes" element={<AllRecipes />} />
          <Route path="/my-profile" element={<ProfilePage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
