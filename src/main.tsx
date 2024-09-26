import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import "./index.scss";
import { LogInProvider } from "./context/LogInContext.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
