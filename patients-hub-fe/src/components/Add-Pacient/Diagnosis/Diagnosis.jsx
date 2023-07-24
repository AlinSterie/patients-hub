import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  SlInput,
  SlTextarea,
  SlAlert,
  SlIcon,
} from "@shoelace-style/shoelace/dist/react";
import classes from "../style.module.css";
import { DataContext } from "../../context/beData";

const Diagnosis = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, updateIdBe, idBe, updateIsEditing] =
    useContext(DataContext);
  const { id } = useParams();
  const [patient, setPatient] = useState({
    initial: "",
    last72Hours: "",
    final: "",
  });

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
            const { initial, last72Hours, final } = patientToUpdate.diagnosis;
            setPatient({
              initial,
              last72Hours,
              final,
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
      initial: "",
      last72Hours: "",
      final: "",
    });
  };

  const handleSave = (event) => {
    event.preventDefault();
    const url =
      id || idBe
        ? `http://localhost:8080/patient/diagnosis/${id || idBe}`
        : `http://localhost:8080/patient/diagnosis`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
      <form className={classes.form} onSubmit={handleSave}>
        <div style={{ position: "absolute", right: "1rem", top: "1rem" }}>
          <SlAlert
            variant="success"
            duration="2000"
            open={open}
            closable
            onSlAfterHide={() => setOpen(false)}
          >
            <SlIcon slot="icon" name="check2-circle" />
            Your data from Diagnosis have been saved
          </SlAlert>
        </div>
        <SlTextarea
          label="Initial diagnosis"
          resize="auto"
          value={patient.initial}
          onSlChange={(e) => {
            setPatient((prevState) => ({
              ...prevState,
              initial: e.target.value,
            }));
          }}
        />
        <SlTextarea
          label="72-hour Diagnosis"
          resize="auto"
          value={patient["last72Hours"]}
          onSlChange={(e) => {
            setPatient((prevState) => ({
              ...prevState,
              last72Hours: e.target.value,
            }));
          }}
        />
        <SlTextarea
          label="Final diagnosis"
          resize="auto"
          value={patient.final}
          onSlChange={(e) => {
            setPatient((prevState) => ({
              ...prevState,
              final: e.target.value,
            }));
          }}
        />
        <div className={classes.btn}>
          <button className={classes.submit}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default Diagnosis;
