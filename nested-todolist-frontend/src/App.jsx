import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import React, { Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import Taskform from "./components/Taskform";
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Home = React.lazy(() => import("./pages/Home"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const Signin = React.lazy(() => import("./pages/Signin"));
const Signup = React.lazy(() => import("./pages/Signup"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Signin />} />
            <Route path="signup" element={<Signup />} />
            <Route path="home" element={<Home />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="/dashboard/:id" element={<Taskform />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
