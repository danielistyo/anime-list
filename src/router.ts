import { createBrowserRouter } from "react-router-dom";
import ListPage from "./pages/List";
import DetailPage from "./pages/Detail";
import BookmarkPage from "./pages/Bookmark";

export default createBrowserRouter([
  {
    path: "/",
    Component: ListPage,
  },
  {
    path: "/anime/:id",
    Component: DetailPage,
  },
  {
    path: "bookmark",
    Component: BookmarkPage,
  },
  
]);
