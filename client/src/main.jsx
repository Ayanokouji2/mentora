import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import store from "./redux/store/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <Toaster position="top-center" richColors />
        <App />
      </Provider>
    </Router>
  </StrictMode>
);
