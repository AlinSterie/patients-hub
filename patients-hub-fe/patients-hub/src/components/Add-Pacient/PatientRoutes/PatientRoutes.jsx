import React from "react";
import Navbar from "../Navbar/Navbar";
import { Routes, Route, Outlet } from "react-router";
import Details from "../Details/Details";
import Diagnosis from "../Diagnosis/Diagnosis";

const PatientRoutes = () => {
  return (
    <nav>
      <Navbar />
      <Outlet />
    </nav>
  );
};

export default PatientRoutes;
