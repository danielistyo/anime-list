import { createBrowserRouter } from "react-router-dom";
import ListPage from "./pages/List";
import DetailPage from "./pages/Detail";

export default createBrowserRouter([
  {
    path: "/",
    Component: ListPage,
  },
  {
    path: "/anime/:id",
    Component: DetailPage,
  },
]);
