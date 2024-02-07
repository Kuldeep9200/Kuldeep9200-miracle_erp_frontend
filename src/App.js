import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Admission from "./components/admission/Admission";
import CreatAdmissionFrom from "./components/admission/CreatAdmissionFrom";
import Dasboard from "./components/dasboard/Dasboard";
import Erpdasboard from "./components/erpdasboard/Erpdasboard";
import AdmissionData from "./components/admission/AdmissionData";
import Login from "./components/loginpage/Login";
import Ragister from "./components/loginpage/Ragister";
import InquriFrom from "./components/inquri/InquriFrom";
import Navbar from "./components/navbar/Navbar";
import Inquri from "./components/inquri/Inquri";
import "./App.css";
import Datasheet from "./components/datasheet/Datasheet";
import PaymentForm from "./components/erpmainegment/ExampleTode";
import Invoice from "./components/invoice/Invoice";
import ProtectedRoute from "./components/context/ProctuedRoute";
import InvoiceDesign from "./components/invoice/InvoiceDesign";
import InvoiceForm from "./components/erpmainegment/ExampleTode";
import Profile from "./components/profilePage/Profile";
import SingleStudent from "./components/admission/SingleStudent";
import InvoiceDetails from "./components/invoice/InvoiceDetails";
import InvoiceDetailsPage from "./components/invoice/InvoiceDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dasboard />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/erpdasboard" element={<Erpdasboard />} />
        <Route path="/ragister" element={<Ragister />} />
        <Route path="/create/inquri" element={<InquriFrom />} />
        <Route path="/inquri/:id" element={<InquriFrom />} />
        <Route path="/datasheet" element={<Inquri />} />
        <Route path="/induridetails" element={<Datasheet />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/invoice/:id" element={<InvoiceDesign />} />
        <Route path="/admissiondata" element={<AdmissionData />} />
        <Route path="/create/admission" element={<CreatAdmissionFrom />} />
        <Route path="/admission/:id" element={<CreatAdmissionFrom />} />
        <Route path="/invoicefrom" element={<InvoiceForm />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/profile/:id" element={<SingleStudent />} />
        <Route path="/singleinvoice/:id" element={<InvoiceDetailsPage />} />
        {/* Add a catch-all route to handle unknown paths */}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
