import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { LogInProvider } from "./context/LogInContext.tsx";
import "./index.scss";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <LogInProvider>
        <App />
        <ToastContainer />
      </LogInProvider>
    </AuthProvider>
  </BrowserRouter>
  // </StrictMode>
);
