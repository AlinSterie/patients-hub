import { useState, useContext } from "react";
import PatientCardsList from "../PatientCardsList/PatientCardsList";
import "../PatientsDashboard/PatientsDashboard.css";
import { SlProgressBar } from "@shoelace-style/shoelace/dist/react";
import Filters from "./Filters";
import specialties from "./specialities.json";
import { PatientsContext } from "../../context/patients";

const PatientsDashboard = () => {
  const [selectedSpeciality, setSelectedSpeciality] = useState({
    name: "",
    color: "",
  });
  const [patients] = useContext(PatientsContext);
  const filteredPatients = patients.filter(
    (patient) =>
      patient.specialization === selectedSpeciality.name ||
      selectedSpeciality.name === ""
  );
  const handleSpecialitySelect = (speciality) => {
    setSelectedSpeciality(speciality);
  };
  return (
    <>
      <Filters
        specialties={specialties}
        onSpecialitySelect={handleSpecialitySelect}
      />
      <div className="dashboard-container">
        {filteredPatients.length ? (
          <>
            <SlProgressBar
              value={filteredPatients.length}
              label="Patients Capacity"
            />
            <div className="dashboard-patients">
              <PatientCardsList selectedSpeciality={selectedSpeciality} />
            </div>
          </>
        ) : (
          <div className="dashboard-patients">
            <PatientCardsList selectedSpeciality={selectedSpeciality} />
          </div>
        )}
      </div>
    </>
  );
};

export default PatientsDashboard;
