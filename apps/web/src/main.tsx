import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import { CategoriesWidget } from "./widgets/Categories/CategoriesWidget";
import { TeamWidget } from "./widgets/Team/TeamWidget";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/widget/games/:gameId/categories"
        element={<CategoriesWidget />}
      />
      <Route
        path="/widget/games/:gameId/teams/:teamId"
        element={<TeamWidget />}
      />
    </Routes>
  </BrowserRouter>
);
