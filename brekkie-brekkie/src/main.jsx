import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";

import FunButtonPage from "./FunButtonPage.jsx";
import LazySusanPage from "./LazySusanPage.jsx";
import ImageButtonsPage from "./ImageButtonsPage.jsx";
// ...import other sitelets

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/fun-button" element={<FunButtonPage />} />
      <Route path="/lazy-susan" element={<LazySusanPage />} />
      <Route path="/image-buttons" element={<ImageButtonsPage />} />
      {/* Add more sitelets here */}
    </Routes>
  </Router>
);
