import classes from "../style.module.css";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/beData";
import {
  SlInput,
  SlTextarea,
  SlAlert,
  SlIcon,
} from "@shoelace-style/shoelace/dist/react";
const HistoryDetails = () => {
  const [isEditing, updateIdBe, idBe, updateIsEditing] =
    useContext(DataContext);
  const { id } = useParams();
  const [patient, setPatient] = useState({
    heredoCollateralAntecedents: "",
    livingAndWorkingConditions: "",
    behaviors: "",
    backgroundMedication: "",
    historyOfDisease: "",
    generalClinicalExamination: "",
  });

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (id || idBe) {
      updateIsEditing(true);
      fetch(`http://localhost:8080/patient/all`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const patients = await response.json();
          const patientToUpdate = patients.find((p) => p.id == id);
          if (patientToUpdate && isEditing) {
            const {
              heredoCollateralAntecedents,
              livingAndWorkingConditions,
              behaviors,
              backgroundMedication,
              historyOfDisease,
              generalClinicalExamination,
            } = patientToUpdate.history;
            setPatient({
              heredoCollateralAntecedents,
              livingAndWorkingConditions,
              behaviors,
              backgroundMedication,
              historyOfDisease,
              generalClinicalExamination,
            });
          }
        })
        .catch((error) => {
          console.error("API error:", error);
        });
    } else {
      updateIsEditing(false);
    }
  }, [id, isEditing, idBe]);
  const clearInputs = () => {
    setPatient({
      heredoCollateralAntecedents: "",
      livingAndWorkingConditions: "",
      behaviors: "",
      backgroundMedication: "",
      historyOfDisease: "",
      generalClinicalExamination: "",
    });
  };
  const submitForm = (e) => {
    e.preventDefault();
    const url =
      id || idBe
        ? `http://localhost:8080/patient/history/${id || idBe}`
        : `http://localhost:8080/patient/history`;
    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          const data = await response.json();
          updateIdBe(data.id);
          updateIsEditing(false);
          clearInputs();
        }
      })
      .catch((error) => {
        console.error("API error:", error);
      });
    setOpen(true);
  };
  return (
    <div className={classes["form-box"]}>
      <div style={{ position: "absolute", right: "1rem", top: "1rem" }}>
        <SlAlert
          variant="success"
          duration="2000"
          open={open}
          closable
          onSlAfterHide={() => setOpen(false)}
        >
          <SlIcon slot="icon" name="check2-circle" />
          Your data from History Details have been saved
        </SlAlert>
      </div>
      <form className={classes.form} onSubmit={submitForm}>
        <SlTextarea
          label="Heredo-collateral antecedents"
          value={patient.heredoCollateralAntecedents}
          onSlChange={(e) =>
            setPatient((prevState) => ({
              ...prevState,
              heredoCollateralAntecedents: e.target.value,
            }))
          }
          resize="auto"
        />
        <SlTextarea
          label="Living and working conditions"
          value={patient.livingAndWorkingConditions}
          onSlChange={(e) =>
            setPatient((prevState) => ({
              ...prevState,
              livingAndWorkingConditions: e.target.value,
            }))
          }
          resize="auto"
        />
        <SlTextarea
          label="Behaviors (smoking, alcohol, etc.)"
          value={patient.behaviors}
          onSlChange={(e) =>
            setPatient((prevState) => ({
              ...prevState,
              behaviors: e.target.value,
            }))
          }
          resize="auto"
        />
        <SlTextarea
          label="Background medication administered before hospitalization "
          value={patient.backgroundMedication}
          onSlChange={(e) =>
            setPatient((prevState) => ({
              ...prevState,
              backgroundMedication: e.target.value,
            }))
          }
          resize="auto"
        />
        <SlTextarea
          label="History of disease"
          value={patient.historyOfDisease}
          onSlChange={(e) =>
            setPatient((prevState) => ({
              ...prevState,
              historyOfDisease: e.target.value,
            }))
          }
          resize="auto"
        />
        <SlTextarea
          label="General Clinical Examination "
          resize="auto"
          value={patient.generalClinicalExamination}
          onSlChange={(e) =>
            setPatient((prevState) => ({
              ...prevState,
              generalClinicalExamination: e.target.value,
            }))
          }
        />
        <div className={classes.btn}>
          <button className={classes.submit}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default HistoryDetails;
