import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  SlInput,
  SlRadio,
  SlOption,
  SlSelect,
  SlRadioGroup,
  SlAlert,
  SlIcon,
} from "@shoelace-style/shoelace/dist/react";
import classes from "../style.module.css";
import "./details.css";
import { DataContext } from "../../context/beData";

const typeOfInsurances = ["Health", "Life"];
const statusOfInsureds = ["Active", "Inactive"];
const typeOfAdmissions = ["Emergency", "Planned"];
const rooms = ["1", "2", "3", "4", "5"];
import specialities from "../../Dashboard/PatientsDashboard/specialities.json";

const Details = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, updateIdBe, idBe, updateIsEditing] =
    useContext(DataContext);
  const { id } = useParams();
  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    address: "",
    personalNumericCode: "",
    idSeriesAndNumber: "",
    typeOfInsurance: "",
    statusOfTheInsured: "",
    typeOfAdmission: "",
    specialization: "",
    roomNo: "",
  });

  useEffect(() => {
    updateIdBe(null);
    updateIsEditing(false);
  }, []);

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
              firstName,
              lastName,
              gender,
              birthDate,
              address,
              personalNumericCode,
              idSeriesAndNumber,
              typeOfInsurance,
              statusOfTheInsured,
              typeOfAdmission,
              specialization,
              roomNo,
            } = patientToUpdate.details;
            setPatient({
              firstName,
              lastName,
              gender,
              birthDate,
              address,
              personalNumericCode,
              idSeriesAndNumber,
              typeOfInsurance,
              statusOfTheInsured,
              typeOfAdmission,
              specialization,
              roomNo,
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
      firstName: "",
      lastName: "",
      gender: "",
      birthDate: "",
      address: "",
      personalNumericCode: "",
      idSeriesAndNumber: "",
      typeOfInsurance: "",
      statusOfTheInsured: "",
      typeOfAdmission: "",
      specialization: "",
      roomNo: "",
    });
  };
  const handleSave = (event) => {
    event.preventDefault();
    const url =
      id || idBe
        ? `http://localhost:8080/patient/details/${id || idBe}`
        : `http://localhost:8080/patient/details`;
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
    <div className={classes.register}>
      <div className={classes["form-box"]}>
        <form className={classes.form} onSubmit={handleSave}>
          <div className="content-details">
            <div style={{ position: "absolute", right: "1rem", top: "1rem" }}>
              <SlAlert
                variant="success"
                duration="2000"
                open={open}
                closable
                onSlAfterHide={() => setOpen(false)}
              >
                <SlIcon slot="icon" name="check2-circle" />
                Your data from Patient Details have been saved
              </SlAlert>
            </div>
            <div className="card">
              <SlInput
                className="input"
                label="First name"
                value={patient.firstName}
                onSlChange={(e) => {
                  setPatient((prevState) => ({
                    ...prevState,
                    firstName: e.target.value,
                  }));
                }}
                required
              />
              <SlInput
                className="input"
                label="Last name"
                value={patient.lastName}
                onSlChange={(e) =>
                  setPatient((prevState) => ({
                    ...prevState,
                    lastName: e.target.value,
                  }))
                }
                required
              />
              <SlRadioGroup
                className="input"
                label=""
                name="a"
                value={patient.gender}
                onSlChange={(e) =>
                  setPatient((prevState) => ({
                    ...prevState,
                    gender: e.target.value,
                  }))
                }
                required
              >
                <div className="gender">
                  <div className="gender-input">
                    <SlRadio value="female">Female</SlRadio>
                  </div>
                  <div className="gender-input">
                    <SlRadio value="male">Male</SlRadio>
                  </div>
                </div>
              </SlRadioGroup>
              <SlInput
                className="input"
                type="date"
                label="Birth date"
                value={
                  patient.birthDate
                    ? new Date(patient.birthDate).toISOString().slice(0, 10)
                    : ""
                }
                onSlChange={(e) =>
                  setPatient((prevState) => ({
                    ...prevState,
                    birthDate: e.target.value,
                  }))
                }
                required
              />
              <SlInput
                className="input"
                label="Address"
                value={patient.address}
                onSlChange={(e) =>
                  setPatient((prevState) => ({
                    ...prevState,
                    address: e.target.value,
                  }))
                }
                required
              />
              <SlInput
                className="input"
                type="number"
                label="Personal Numeric Code"
                value={patient.personalNumericCode}
                onSlChange={(e) =>
                  setPatient((prevState) => ({
                    ...prevState,
                    personalNumericCode: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="card">
              <SlInput
                className="input"
                type="string"
                label="ID: Series and number"
                value={patient.idSeriesAndNumber}
                onSlChange={(e) =>
                  setPatient((prevState) => ({
                    ...prevState,
                    idSeriesAndNumber: e.target.value,
                  }))
                }
                required
              />
              <SlSelect
                className="input"
                size="small"
                placeholder="Type of insurance"
                value={patient.typeOfInsurance}
                onSlChange={(e) =>
                  setPatient((prevState) => ({
                    ...prevState,
                    typeOfInsurance: e.target.value,
                  }))
                }
              >
                {typeOfInsurances.map((e) => (
                  <SlOption key={e} value={e}>
                    {e}
                  </SlOption>
                ))}
              </SlSelect>
              <SlSelect
                className="input"
                size="small"
                placeholder="Status of the insured"
                value={patient.statusOfTheInsured}
                onSlChange={(e) =>
                  setPatient((prevState) => ({
                    ...prevState,
                    statusOfTheInsured: e.target.value,
                  }))
                }
              >
                {statusOfInsureds.map((e) => (
                  <SlOption key={e} value={e}>
                    {e}
                  </SlOption>
                ))}
              </SlSelect>
              <SlSelect
                className="input"
                size="small"
                placeholder="Type of admission"
                value={patient.typeOfAdmission}
                onSlChange={(e) =>
                  setPatient((prevState) => ({
                    ...prevState,
                    typeOfAdmission: e.target.value,
                  }))
                }
              >
                {typeOfAdmissions.map((e) => (
                  <SlOption key={e} value={e}>
                    {e}
                  </SlOption>
                ))}
              </SlSelect>
              <SlSelect
                className="input"
                size="small"
                placeholder="Room number"
                value={patient.roomNo}
                onSlChange={(e) =>
                  setPatient((prevState) => ({
                    ...prevState,
                    roomNo: e.target.value,
                  }))
                }
              >
                {rooms.map((e) => (
                  <SlOption key={e} value={e}>
                    {`Room ${e}`}
                  </SlOption>
                ))}
              </SlSelect>
              <SlSelect
                className="input"
                size="small"
                placeholder="Speciality"
                value={patient.specialization.replace(/\s/g, "_")}
                onSlChange={(e) => {
                  const value = e.target.value;
                  const normalizedValue = value.replace(/_/g, " ");
                  setPatient((prevState) => ({
                    ...prevState,
                    specialization: normalizedValue,
                  }));
                }}
              >
                {specialities.map((e) => (
                  <SlOption key={e.name} value={e.name.replace(/\s/g, "_")}>
                    {e.name}
                  </SlOption>
                ))}
              </SlSelect>
            </div>
          </div>
          <button className={classes.submit}>Save</button>
        </form>
      </div>
    </div>
  );
};
export default Details;
