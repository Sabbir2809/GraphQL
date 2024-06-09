import { createBrowserRouter } from "react-router-dom";
import App from "../pages/App";
import Login from "../pages/Login/Login";
import Posts from "../pages/Post/Posts";
import Registration from "../pages/Registration/Registration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
]);
