import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ProfileProvider } from "./context/ProfileContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import "./styles/states.css";
import "./styles/skills.css";
import "./styles/certifications.css";
// Must stay last: light-mode overrides rely on loading after the base styles.
import "./styles/theme.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ProfileProvider>
          <App />
        </ProfileProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
