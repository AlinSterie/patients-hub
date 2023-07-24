import { Link } from "react-router-dom";
import PatientCard from "../PatientCard/PatientCard";
import { SlIconButton, SlTooltip } from "@shoelace-style/shoelace/dist/react";
import "../PatientCardsList/PatientCardsList.css";

import specialties from "../PatientsDashboard/specialities.json";
import { PatientsContext } from "../../context/patients";
import { useContext, useEffect } from "react";

const PatientCardsList = ({ selectedSpeciality }) => {
  const [patients, setPatients] = useContext(PatientsContext);
  useEffect(() => {
    const fetchPatients = () => {
      fetch("http://localhost:8080/patient/all", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }).then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setPatients(data);
        }
      });
    };
    fetchPatients();
  }, []);
  const filteredPatients = selectedSpeciality.name
    ? patients.filter(
        (patient) => patient.details?.specialization === selectedSpeciality.name
      )
    : patients;

  return (
    <>
      {filteredPatients &&
        filteredPatients.map((patient) => {
          const specializationColor =
            specialties.find(
              (specialty) => specialty.name === patient.details?.specialization
            )?.color || "black";

          return (
            <div key={patient.id}>
              <PatientCard
                id={patient?.id}
                firstName={patient.details?.firstName}
                lastName={patient.details?.lastName}
                specialization={patient.details?.specialization}
                roomNo={patient.details?.roomNo}
                dateOfAdmission={patient.details?.birthDate}
                specializationColor={specializationColor}
              />
            </div>
          );
        })}
      <div>
        <SlTooltip content="Add patient">
          <Link to={"/edit-patient/patient-details/"}>
            <SlIconButton name="plus-circle" label="Add patient" />
          </Link>
        </SlTooltip>
      </div>
    </>
  );
};

export default PatientCardsList;
