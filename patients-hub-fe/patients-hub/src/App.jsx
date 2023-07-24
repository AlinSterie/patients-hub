import { Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register/Register";
import ResetPassword from "./components/Auth/ResetPassword/ResetPassword";
import Login from "./components/Auth/Login/Login";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import Details from "./components/Add-Pacient/Details/Details";
import Diagnosis from "./components/Add-Pacient/Diagnosis/Diagnosis";
import SurgeryDetails from "./components/Add-Pacient/SurgeryDetails/SurgeryDetails";
import HistoryDetails from "./components/Add-Pacient/HistoryDetails/HistoryDetails";
import ViewPacient from "./components/ViewPacient/ViewPacient";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import "./App.css";
import Err404Page from "./components/Error404Page/Error404Page";
import PatientsDashboard from "./components/Dashboard/PatientsDashboard/PatientsDashboard";
import PatientRoutes from "./components/Add-Pacient/PatientRoutes/PatientRoutes";
import EvolutionTreatment from "./components/Add-Pacient/Evolution-Treatment/EvolutionTreatment";
import PrivateRoutes from "./components/utils/PrivateRoutes";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth";
import PublicRoutes from "./components/utils/PublicRoutes";
import { SlSpinner } from "@shoelace-style/shoelace/dist/react";

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.3.0/dist/"
);

function App() {
  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    const getUserToken = () => {
      fetch("http://localhost:8080/user", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }).then(async (response) => {
        const data = await response.json();
        if (response.status === 200) {
          setAuth({ ...auth, retry: false, user: data });
        } else {
          setAuth({ ...auth, retry: false, user: null });
        }
      });
    };
    if (auth.retry === true) getUserToken();
  }, [auth.retry]);
  return (
    <div>
      {auth.retry ? (
        <div className="spinnerCard">
          <SlSpinner className="spinner" />
        </div>
      ) : (
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/reset-password/:resetToken"
              element={<ResetPassword />}
            />
          </Route>

          {/* Protected Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<PatientsDashboard />} />
            <Route path="/patient/:id" element={<ViewPacient />} />
            <Route path="edit-patient" element={<PatientRoutes />}>
              <Route path="patient-details/:id?" element={<Details />} />
              <Route path="diagnosis/:id?" element={<Diagnosis />} />
              <Route path="surgery-details/:id?" element={<SurgeryDetails />} />
              <Route path="history-details/:id?" element={<HistoryDetails />} />
              <Route
                path="evolution-and-treatment/:id?"
                element={<EvolutionTreatment />}
              />
            </Route>
          </Route>
          <Route path="*" element={<Err404Page />}></Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
