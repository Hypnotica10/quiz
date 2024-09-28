import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { LogInProvider } from "./context/LogInContext.tsx";
import { CreateFlashcardsProvider } from "./context/CreateFlashcardsContext.tsx";
import App from "./App.tsx";
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <CreateFlashcardsProvider>
      <AuthProvider>
        <LogInProvider>
          <App />
          <ToastContainer />
        </LogInProvider>
      </AuthProvider>
    </CreateFlashcardsProvider>
  </BrowserRouter>
  // </StrictMode>
);
