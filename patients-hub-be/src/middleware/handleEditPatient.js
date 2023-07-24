const db = require("../db");
const { sendErrorMessage } = require("../helpers");

function handleEditPatient(req, res, field, newData) {
  const patients = db.getPatients();
  let editedId = null;

  if (!req.params.id) {
    editedId = patients.length + 1;
    patients.push({ id: editedId, [field]: newData });
  } else {
    const patient = patients.find((p) => p.id.toString() === req.params.id);
    if (!patient) return sendErrorMessage(res, 400, "patient_id_not_found");

    editedId = patient.id;
    patient[field] = newData;
  }

  db.savePatients(patients);
  return res.send(JSON.stringify({ id: editedId }));
}

module.exports = handleEditPatient;
