import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import { CategoryWidget } from "./widgets/CategoryWidget";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/widget/games/:id/categories" element={<CategoryWidget />} />
    </Routes>
  </BrowserRouter>
);
