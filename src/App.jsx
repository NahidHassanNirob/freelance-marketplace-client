import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./components/AuthProvider.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import './index.css';

// Pages
import Home from "./pages/Home.jsx";
import AllJobs from "./pages/AllJobs.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AddJob from "./pages/AddJob.jsx";
import UpdateJob from "./pages/UpdateJob.jsx";
import MyAcceptedTasks from "./pages/MyAcceptedTasks.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/allJobs" element={<AllJobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          <Route
            path="/allJobs/:id"
            element={
              <PrivateRoute>
                <JobDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/addJob"
            element={
              <PrivateRoute>
                <AddJob />
              </PrivateRoute>
            }
          />
          <Route
            path="/updateJob/:id"
            element={
              <PrivateRoute>
                <UpdateJob />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-accepted-tasks"
            element={
              <PrivateRoute>
                <MyAcceptedTasks />
              </PrivateRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-right" />
      </AuthProvider>
    </Router>
  );
}

export default App;
