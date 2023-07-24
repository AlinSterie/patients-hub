import React from 'react';
import "../PatientsDashboard/PatientsDashboard.css";

const Specialty = ({ name, color, isSelected, onSelect }) => {
    const handleClick = () => {
        if (isSelected) {
            onSelect({ name: '', color: '' });
        } else {
            onSelect({ name, color });
        }
    };

    return (
        <div
            className={`speciality-pill ${isSelected ? 'selected' : ''}`}
            style={{ backgroundColor: isSelected ? '#4d04c4' : '#8067e39d' }}
            onClick={handleClick}
        >
            <div className="bullet" style={{ backgroundColor: color }}></div>
            <div className="name">{name}</div>
        </div>
    );
};

export default Specialty;
