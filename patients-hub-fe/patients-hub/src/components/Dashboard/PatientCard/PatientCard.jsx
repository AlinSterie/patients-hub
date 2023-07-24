import "./PatientCard.css";
import { Link } from "react-router-dom";
import { format } from 'date-fns';

const Card = ({ id, firstName, lastName, specialization, roomNo, dateOfAdmission, specializationColor }) => {
  return (
    <div className="card-container">
      <Link to={`/patient/${id}`} className="patient-card">
        <div className="card-header" style={{color: specializationColor}}>
          <h3>{specialization}</h3>
        </div>
        <div className="card-main">
          <h2>{`${firstName} ${lastName}`}</h2>
        </div>
        <div className="card-footer">
          <div className="card-footer-room-no">
            <sl-icon name="map"></sl-icon>
            <span>{`Room ${roomNo}`}</span>
          </div>
          <div className="card-footer-date">
            <sl-icon name="calendar4"></sl-icon>
            <span>{format(new Date(dateOfAdmission), 'dd/MM/yyyy')}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
