import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import React, { Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
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
            <Route path="about" element={<h1>this is about page page</h1>} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
