import classes from "./pacients.module.css";
import image from "../assets/pencil-svgrepo-com.svg";
import React from "react";
import ToggleSection from "./ToggleDetails";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useContext } from "react";
import { PatientsContext } from "../context/patients";

function PatientsView() {
  const { id } = useParams();
  const [patients] = useContext(PatientsContext);

  const selectedPatient = patients.find((p) => p.id === parseInt(id));
  if (!selectedPatient) {
    return <div>Patient not found.</div>;
  }
  return (
    <div>
      <div key={selectedPatient.id} className={classes["pacient-card"]}>
        <h1 className={classes["pacient-card-name"]}>
          {selectedPatient.details.firstName +
            " " +
            selectedPatient.details.lastName}
          <Link to={`/edit-patient/patient-details/${selectedPatient.id}`}>
            <button className={classes["edit-pacient-button"]}>
              <img
                className={classes["edit-pacient"]}
                src={image}
                alt="Edit Pacient"
              />
            </button>
          </Link>
        </h1>
        <ToggleSection
          sectionTitle="Patient Details"
          sectionInfo="General info about the patient"
          sectionContent={
            <div className={classes["dropdown-text"]}>
              <p>First Name: {selectedPatient.details.firstName}</p>
              <p>Last Name: {selectedPatient.details.lastName}</p>
              <p>Gender: {selectedPatient.details.gender}</p>
              <p>Birth Date: {selectedPatient.details.birthDate}</p>
              <p>Address: {selectedPatient.details.address}</p>
              <p>
                Personal Numeric Code:{" "}
                {selectedPatient.details.personalNumericCode}
              </p>
              <p>
                ID Series and Number:{" "}
                {selectedPatient.details.idSeriesAndNumber}
              </p>
              <p>Insurance Type: {selectedPatient.details.typeOfInsurance}</p>
              <p>
                Insured status: {selectedPatient.details.statusOfTheInsured}
              </p>
              <p>Admission Type: {selectedPatient.details.typeOfAdmission}</p>
              <p>Specialization: {selectedPatient.details.specialization}</p>
              <p>Room: {selectedPatient.details.roomNo}</p>
            </div>
          }
        />
        <ToggleSection
          sectionTitle="Diagnosis"
          sectionInfo="Pacient's diagnosis"
          sectionContent={
            <div className={classes["dropdown-text"]}>
              <p>Initial Diagnosis: {selectedPatient.diagnosis?.initial}</p>
              <p>72Hours Diagnosis: {selectedPatient.diagnosis?.["72Hours"]}</p>
              <p>Final Diagnosis: {selectedPatient.diagnosis?.final}</p>
            </div>
          }
        />
        <ToggleSection
          sectionTitle="Suregery details"
          sectionInfo="Surgery details if it is the case"
          sectionContent={
            <div className={classes["dropdown-text"]}>
              <p>Team of Medics: {selectedPatient.surgery?.teamOfMedics}</p>
              <p>Details: {selectedPatient.surgery?.details}</p>
              <p>Date: {selectedPatient.surgery?.date}</p>
            </div>
          }
        />
        <ToggleSection
          sectionTitle="History details"
          sectionInfo="History of ilnesses"
          sectionContent={
            <div className={classes["dropdown-text"]}>
              <p>
                {" "}
                Heredo-collateral Antecedents:{" "}
                {selectedPatient.history?.heredoCollateralAntecedents}
              </p>
              <p>
                {" "}
                Living and Working Conditions:{" "}
                {selectedPatient.history?.livingAndWorkingConditions}
              </p>
              <p> Behaviors: {selectedPatient.history?.behaviors}</p>
              <p>
                {" "}
                Background Medication:{" "}
                {selectedPatient.history?.backgroundMedication}
              </p>
              <p>
                {" "}
                History of Disease: {selectedPatient.history?.historyOfDisease}
              </p>
              <p>
                {" "}
                General Clinical Examination:{" "}
                {selectedPatient.history?.generalClinicalExamination}
              </p>
            </div>
          }
        />
        <ToggleSection
          sectionTitle="Evolution and treatment"
          sectionInfo="Pacient's evolution and recommanded treatment"
          sectionContent={
            selectedPatient?.evolutionAndTreatment?.map((e) => (
                <div key={`${e.from}-${e.to}`} className={classes["dropdown-text"]}>
                  <p>Date: {`${e.from} --- ${e.to}`}</p>
                  <p>Notes: {e.notes}</p>
                </div>
              ))
          }
        />
      </div>
    </div>
  );
}

export default PatientsView;
