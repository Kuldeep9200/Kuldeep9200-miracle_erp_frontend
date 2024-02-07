import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const YourComponent = () => {
  const { authToken } = useAuth();
  const token = authToken && authToken.token ? authToken.token : null;
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [currentPaidAmount, setCurrentPaidAmount] = useState("");

  useEffect(() => {
    // Fetch data or perform any initial actions here
  }, []);

  const handleCreateInvoice = async () => {
    try {
      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const response = await axios.post(
        "http://localhost:5000/api/invoice/create-invoice",
        { studentId, paymentMethod, currentPaidAmount },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );

      const data = response.data;
      console.log("API Response:", data);

      // If the invoice creation was successful, show success message
      if (response.status === 200) {
        toast.success("Invoice created successfully");
        // Add your navigation logic here, for example:
        navigate("/invoice");
      }
    } catch (error) {
      console.error("Error creating invoice:", error);

      // Display error message using toast
      toast.error(error.response?.data?.message || "An error occurred");
      
      // Check for specific errors and handle accordingly
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized - Check your authentication token");
        // Add your logic to handle unauthorized access
      }
    }
  };

  return (
    <div
      className="mainpaymentcontainer"
      style={{
        width: "42%",
        margin: "10% 10% 5% 35%",
        alignItems: "center",
        padding: "7%",
        background: "white",
      }}
    >
      <h3 className="textcontner" style={{ textAlign: "center" }}>
        Make Payment
      </h3>
      <label>
        Student ID:
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </label>
      <br />
      <label>
        Payment Method:
        <input
          type="text"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
      </label>
      <br />
      <label>
        Amount
        <input
          type="number"
          value={currentPaidAmount}
          onChange={(e) => setCurrentPaidAmount(e.target.value)}
        />
      </label>
      <button onClick={handleCreateInvoice} style={{ marginTop: "30px" }}>
        Create Invoice
      </button>
    </div>
  );
};

export default YourComponent;
