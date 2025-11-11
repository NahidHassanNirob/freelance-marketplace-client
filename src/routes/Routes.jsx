// src/routes/Routes.jsx
import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import AllJobs from "../pages/AllJobs";
import AddJob from "../pages/AddJob";
import JobDetails from "../pages/JobDetails";
import MyAcceptedTasks from "../pages/MyAcceptedTasks"; // /my-accepted-tasks
import MyPostedJobs from "../pages/MyPostedJobs";
import UpdateJob from "../pages/UpdateJob";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/allJobs",
                element: <AllJobs />,
            },
            {
                path: "/job/:id",
                element: <PrivateRoute><JobDetails /></PrivateRoute>, // Protected
            },
            {
                path: "/addJob",
                element: <PrivateRoute><AddJob /></PrivateRoute>, // Protected
            },
            {
                path: "/myPostedJobs",
                element: <PrivateRoute><MyPostedJobs /></PrivateRoute>, // Protected
            },
            {
                path: "/updateJob/:id",
                element: <PrivateRoute><UpdateJob /></PrivateRoute>, // Protected
            },
            {
                path: "/my-accepted-tasks",
                element: <PrivateRoute><MyAcceptedTasks /></PrivateRoute>, // Protected
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            // Note: BidRequests and MyBids routes should be added if you implement that feature
        ],
    },
]);

export default router;