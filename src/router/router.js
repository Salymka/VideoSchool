import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import AllCoursesPage from "../pages/AllCoursePage/AllCoursesPage";
import CoursePage from "../pages/CoursePage/CoursePage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <AllCoursesPage/>,

    },
    {
        path: "/:id",
        element: <CoursePage/>,

    },

]);
export default router;