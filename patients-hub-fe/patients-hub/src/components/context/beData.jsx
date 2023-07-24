import { createContext, useContext } from "react";
import { useState } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [isEditing, setIsEditing] = useState(false);
  const [idBe, setIdBe] = useState(null);
  const updateIdBe = (newId) => {
    setIdBe(newId);
  };
  const updateIsEditing = (isEditing) => {
    setIsEditing(isEditing);
  };
  const value = [isEditing, updateIdBe, idBe, updateIsEditing];
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
