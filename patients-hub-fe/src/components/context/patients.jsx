import { createContext } from "react";
import { useState } from "react";

export const PatientsContext = createContext([]);
export function PatientsProvider({ children }) {
  const [patients, setPatients] = useState([]);

  return (
    <PatientsContext.Provider value={[patients, setPatients]}>
      {children}
    </PatientsContext.Provider>
  );
}