import "./App.css";
import React from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

/**
 * Header
 * --Logo
 * --Nav Items
 * Body
 * --Search
 * --RestaurantContainer
 * ---RestaurantCard
 * ----Name, Cuisines, rating, delivery time
 * Footer
 * --Copyright
 * --Links
 * --Address
 * --Contact
 */

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

export default function App() {
  return <RouterProvider router={appRouter} />;
}

function AppLayout() {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}
