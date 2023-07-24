import React, { useState, useEffect, useContext } from "react";
import EvolutionCard from "./EvolutionCard";
import classes from "../style.module.css";
import "./evolutionTreatment.css";
import { DataContext } from "../../context/beData";
import { useParams } from "react-router-dom";
import {
  SlInput,
  SlTextarea,
  SlAlert,
  SlIcon,
} from "@shoelace-style/shoelace/dist/react";

const EvolutionTreatment = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, updateIdBe, idBe, updateIsEditinge] =
    useContext(DataContext);
  const { id } = useParams();
  const [list, setList] = useState([]);
  const [editingIds, setEditingIds] = useState([]);
  const [cachedList, setCachedList] = useState(null);

  useEffect(() => {
    if (id || idBe) {
      updateIsEditinge(true);
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
          if (patientToUpdate?.evolutionAndTreatment?.length) {
            setList(patientToUpdate.evolutionAndTreatment);
          } else {
            addNewElement();
          }
        })
        .catch((error) => {
          console.error("API error:", error);
        });
    } else {
      updateIsEditinge(false);
      addNewElement();
    }
  }, []);

  const updateElement = ({ index, element }) => {
    const newList = [...list];
    newList[index] = element;
    setList(newList);
  };

  const setEditingId = (id) => {
    setEditingIds((prevState) => [...prevState, id]);
    setCachedList(list);
  };

  const addNewElement = () => {
    if (editingIds.length) {
      setList(cachedList);
      setEditingIds([]);
    } else {
      setCachedList(list);
      setList([...list, { from: "", to: "", notes: "" }]);
      setEditingIds((prevState) => [...prevState, list.length]);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    setEditingIds([]);
    setCachedList(null);
    setOpen(true);
    const url =
      id || idBe
        ? `http://localhost:8080/patient/evolution-and-treatment/${id || idBe}`
        : `http://localhost:8080/patient/evolution-and-treatment`;
    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          const data = await response.json();
          updateIdBe(data.id);
        }
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };
  return (
    <div className="content">
      <div style={{ position: "absolute", right: "1rem", top: "1rem" }}>
        <SlAlert
          variant="success"
          duration="2000"
          open={open}
          closable
          onSlAfterHide={() => setOpen(false)}
        >
          <SlIcon slot="icon" name="check2-circle" />
          Your data from Evolution and Treatment have been saved
        </SlAlert>
      </div>
      {list.map((e, i) => {
        return (
          <EvolutionCard
            key={i || null}
            setEditing={() => setEditingId(i)}
            isEditing={editingIds.includes(i)}
            data={e}
            updateElement={({ data }) =>
              updateElement({ index: i, element: data })
            }
          />
        );
      })}
      <div className="buttons">
        <div>
          <button className={classes.submit} onClick={onSave}>
            Save
          </button>
          <p
            className="button"
            onClick={() => {
              addNewElement();
            }}
          >
            {editingIds.length
              ? "Dismiss"
              : "Add new evolution and treatment info"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EvolutionTreatment;
