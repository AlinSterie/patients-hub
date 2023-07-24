import classes from "./pacients.module.css";
import React, { useState } from "react";



function ToggleSection({ sectionTitle, sectionInfo, sectionContent }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className={classes["pacient-details"]} onClick={handleToggle}>
                {isOpen ? "" : ""} <span className={classes["section-title"]}>{sectionTitle}</span>{" "}
                <span className={classes["section-info"]}>{sectionInfo}</span>
            </button>
            {isOpen && <div className={classes["section-content"]}>{sectionContent}</div>}
        </div>
    );
}

export default ToggleSection;
