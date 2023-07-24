const fs = require("fs");
const path = require("path");

class DB {
  usersFilePath = path.join(__dirname, "./users.json");
  patientsFilePath = path.join(__dirname, "./patients.json");

  getUsers() {
    return JSON.parse(fs.readFileSync(this.usersFilePath).toString());
  }

  saveUsers(users) {
    fs.writeFileSync(this.usersFilePath, JSON.stringify(users, null, 2));
  }

  getPatients() {
    return JSON.parse(fs.readFileSync(this.patientsFilePath).toString());
  }

  savePatients(patients) {
    fs.writeFileSync(this.patientsFilePath, JSON.stringify(patients, null, 2));
  }
}

module.exports = new DB();
