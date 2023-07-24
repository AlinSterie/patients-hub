import React, { useEffect, useState } from "react";
import { SlIcon, SlInput } from "@shoelace-style/shoelace/dist/react";
import "./evolutionCard.css";

const EvolutionCard = ({ data, updateElement, isEditing, setEditing }) => {
  const onChangeStartDate = (event) => {
    updateElement({
      data: { ...data, from: event.target.value },
    });
  };
  const onChangeEndDate = (event) => {
    updateElement({
      data: { ...data, to: event.target.value },
    });
  };
  const onChangeInfo = (event) => {
    updateElement({
      data: { ...data, notes: event.target.value },
    });
  };
  if (isEditing) {
    return (
      <div className="card">
        <div className="info">
          <SlInput
            value={data.notes}
            onSlChange={onChangeInfo}
            placeholder="Evolution and treatment"
          />
        </div>
        <div className="date-container-edit">
          <SlInput
            value={data.from}
            onSlChange={onChangeStartDate}
            className="date-edit"
            type="date"
            placeholder="from"
          />
          <SlInput
            value={data.to}
            onSlChange={onChangeEndDate}
            className="date-edit"
            type="date"
            placeholder="to"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="card">
      <div className="header">
        <p className="date">
          {data.from} --- {data.to}
        </p>
        <SlIcon
          className="pencil"
          name="pencil"
          onclick={() => setEditing()}
        ></SlIcon>
      </div>
      <div className="info">
        <p>{data.notes}</p>
      </div>
    </div>
  );
};

export default EvolutionCard;
