import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";

import LoadingSpinner from "./components/LoadingSpinner";
import Taskform from "./components/Taskform";
import { authenticateUser } from "./features/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectRoute from "./components/RedirectRoute";
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Home = React.lazy(() => import("./pages/Home"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const Signin = React.lazy(() => import("./pages/Signin"));
const Signup = React.lazy(() => import("./pages/Signup"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticateUser());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route element={<RedirectRoute />}>
              <Route index element={<Signin />} />
              <Route path="signup" element={<Signup />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="home" element={<Home />} />
              <Route path="dashboard" element={<Dashboard />}>
                <Route path="/dashboard/:id" element={<Taskform />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
