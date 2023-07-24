import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/context/auth";
import { DataProvider } from "./components/context/beData";
import { PatientsProvider } from "./components/context/patients";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <PatientsProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </PatientsProvider>
    </AuthProvider>
  </BrowserRouter>
);
