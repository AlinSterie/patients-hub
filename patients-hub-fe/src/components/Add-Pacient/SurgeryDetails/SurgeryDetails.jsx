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
const SurgeryDetails = () => {
  const [isEditing, updateIdBe, idBe, updateIsEditing] =
    useContext(DataContext);
  const { id } = useParams();
  const [patient, setPatient] = useState({
    teamOfMedics: "",
    details: "",
    date: "",
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
            const { teamOfMedics, details, date } = patientToUpdate.surgery;
            setPatient({ teamOfMedics, details, date });
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
    setPatient({ teamOfMedics: "", details: "", date: "" });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const url =
      id || idBe
        ? `http://localhost:8080/patient/surgery/${id || idBe}`
        : `http://localhost:8080/patient/surgery`;
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
          Your data from Surgery Details have been saved
        </SlAlert>
      </div>
      <form className={classes.form} onSubmit={submitForm}>
        <div className={classes.areaZone}>
          <SlTextarea
            label="Team of medics"
            resize="auto"
            value={patient.teamOfMedics}
            onSlChange={(e) =>
              setPatient((prevState) => ({
                ...prevState,
                teamOfMedics: e.target.value,
              }))
            }
          />
          <SlTextarea
            label="Details"
            resize="auto"
            value={patient.details}
            onSlChange={(e) =>
              setPatient((prevState) => ({
                ...prevState,
                details: e.target.value,
              }))
            }
          />
        </div>
        <div className={classes.areaData}>
          <SlInput
            type="date"
            placeholder="Date"
            value={
              patient.date
                ? new Date(patient.date).toISOString().slice(0, 10)
                : ""
            }
            onSlChange={(e) =>
              setPatient((prevState) => ({
                ...prevState,
                date: e.target.value,
              }))
            }
          />
        </div>

        <div className={classes.btn}>
          <button className={classes.submit}>Save</button>
        </div>
      </form>
    </div>
  );
};
export default SurgeryDetails;
