import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useParams } from "react-router-dom";

const Navbar = () => {
  const { id } = useParams();
  return (
    <nav>
      <ul className="menu">
        <li>
          <Link
            className="link"
            to={`/edit-patient/patient-details/${id || ""}`}
          >
            PATIENT DETAILS
          </Link>
        </li>
        <li>
          <Link className="link" to={`/edit-patient/diagnosis/${id || ""}`}>
            DIAGNOSIS
          </Link>
        </li>
        <li>
          <Link
            className="link"
            to={`/edit-patient/surgery-details/${id || ""}`}
          >
            SURGERY DETAILS
          </Link>
        </li>
        <li>
          <Link
            className="link"
            to={`/edit-patient/history-details/${id || ""}`}
          >
            HISTORY DETAILS
          </Link>
        </li>
        <li>
          <Link
            className="link"
            to={`/edit-patient/evolution-and-treatment/${id || ""}`}
          >
            EVOLUTION AND TREATMENT
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
