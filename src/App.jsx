import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const TheBlog = lazy(() => import("./pages/TheBlog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<TheBlog />} />
          <Route path="/detail/:year/:month/:day/:id" element={<BlogDetail />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
