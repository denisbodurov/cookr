import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider.tsx";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "../pages/home.tsx";
import Register from "../pages/register.tsx";
import Login from "../pages/login.tsx";
import AllRecipes from "../pages/all-recipes.tsx";
import AddNew from "../pages/addNew.tsx";
import ProfilePage from "../pages/profile-page.tsx";

const Routes = () => {
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: "/home",
      element: <Home/>,
    },
    {
      path: "/all-recipes",
      element: <AllRecipes/>,
    },
    {
        path: "/recipe-page",
        element: <AllRecipes/>,
      },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/add-new",
          element: <AddNew/>,
        },
        {
          path: "/profile-page",
          element: <ProfilePage/>,
        },
      ],
    },
  ];


  const routesForNotAuthenticatedOnly = [
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;

{/**import React from "react";
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

export default App; */}