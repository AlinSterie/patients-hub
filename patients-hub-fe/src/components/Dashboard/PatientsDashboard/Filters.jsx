import React, { useState } from 'react';
import SpecialtiesFilter from './SpecialitiesFilter';
import "../PatientsDashboard/PatientsDashboard.css";
import upArrow from "../../assets/up-arrow-svg.svg";
import downArrow from "../../assets/down-arrow-svg.svg";

const Filters = ({ specialties, onSpecialitySelect }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [selectedSpeciality, setSelectedSpeciality] = useState({ name: '', color: '' });

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleSpecialitySelect = (speciality) => {
        onSpecialitySelect(speciality);
        if (selectedSpeciality.name === speciality.name) {
            setSelectedSpeciality({ name: '', color: '' });
        } else {
            setSelectedSpeciality(speciality);
        }
    };

    return (
        <div>
            <div className="header-specialities">
                <h1>HOSPITAL X</h1>
                <button className="speciality-show" onClick={toggleFilters}>
                    {selectedSpeciality.name ? (
                        <p className="show">{selectedSpeciality.name}</p>
                    ) : (
                        <p className={!showFilters ? 'show' : 'hide'}>Choose specialities...</p>
                    )}
                    <img className="dropdrown-arrow" src={showFilters ? '' : downArrow} />
                </button>
            </div>

            {showFilters && (
                <div className="speciality-group">
                    {specialties.map((speciality) => (
                        <SpecialtiesFilter
                            key={speciality.name}
                            name={speciality.name}
                            color={speciality.color}
                            isSelected={selectedSpeciality.name === speciality.name}
                            onSelect={handleSpecialitySelect}
                        />
                    ))}
                    <button className="speciality-show" onClick={toggleFilters}>
                        <p className="hide">Hide Filters</p>
                        <img className="dropdrown-arrow" src={upArrow} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Filters;
