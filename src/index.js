import ReactDOM from "react-dom/client";
import { RecoilRoot, atom } from "recoil";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./components/Home";
import Protected from "./components/Protected";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <RecoilRoot>
    <Router>
      <Routes>
        <Route path="/in" element={<App />} />
        <Route path="/home" element={<Protected Component={Home} />} />

        <Route path="/" element={<Navigate to="/in" />} />
      </Routes>
    </Router>
  </RecoilRoot>
);
export const modalState = atom({
  key: "modalState",
  default: false,
});

export const filterState = atom({
  key: "filterState",
  default: null,
});
export const cartState = atom({
  key: "cartState",
  default: [],
});
