import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<h1>this is home page</h1>} />
          <Route path="about" element={<h1>this is about page page</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
