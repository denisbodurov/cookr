import Home from "../pages/home.tsx";
import Register from "../pages/register.tsx";
import Login from "../pages/login.tsx";
import AllRecipes from "../pages/all-recipes.tsx";
import AddNew from "../pages/addNew.tsx";
import ProfilePage from "../pages/profile-page.tsx";
import { useAuth } from "../provider/AuthProvider.tsx";
import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import Layout from "./Layout.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import PublicRoute from "./PublicRoute.tsx";

const Routes = () => {
  const { accessToken } = useAuth();
  const [router, setRouter] = useState<ReturnType<
    typeof createBrowserRouter
  > | null>(null);

  useEffect(() => {
    if (accessToken === undefined) return;

    const publicRoutes: RouteObject[] = [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: <PublicRoute />,
        children: [{ path: "", element: <Login /> }],
      },
      {
        path: "/register",
        element: <PublicRoute />,
        children: [{ path: "", element: <Register /> }],
      },
      { path: "/recipes", element: <AllRecipes /> },
    ];

    const protectedRoutes: RouteObject[] = [
      {
        path: "/add-new",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <AddNew /> }],
      },
      {
        path: "/profile",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <ProfilePage /> }],
      },
    ];

    const routes: RouteObject[] = [
      {
        path: "/",
        element: <Layout />,
        children: [
          ...publicRoutes,
          ...protectedRoutes,
          // { path: '*', element: <NotFound /> }, // Fallback route
        ],
      },
    ];

    setRouter(createBrowserRouter(routes));
  }, [accessToken]);

  if (!router) return <div>Loading...</div>;

  return <RouterProvider router={router} />;
};

export default Routes;
