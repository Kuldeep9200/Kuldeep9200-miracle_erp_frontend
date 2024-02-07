// SingleStudent.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./admission.css";

function SingleStudent() {
  const { id } = useParams();
  const [studentData, setStudentData] = useState(null);
  const { authToken } = useAuth();
  const token = authToken && authToken.token ? authToken.token : null;
  const isoDateString = "2024-01-22T13:23:53.631Z";
  const admissionDate = new Date(isoDateString);

  // Format the date in a readable format
  const formattedDate = admissionDate.toLocaleDateString();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/student/get-student/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        console.log(response.data.admission);
        if (response.data.success) {
          setStudentData(response.data.admission); // Assuming 'student' is the correct property
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, token]);

  return (
    <div className="pagecontainer">
      <h1 style={{ textAlign: "center" }}>Student Details</h1>
      {studentData ? (
        <table id="customers" style={{ width: "70%", margin: "auto" }}>
          <tbody>
            <tr>
              <td>Student Name</td>

              <td>{studentData.name}</td>
            </tr>
            <tr>
              <td> Mobile Number</td>

              <td>{studentData.mobileNumber}</td>
            </tr>
            <tr>
              <td>Father Mobile Number</td>

              <td>{studentData.parentsContact}</td>
            </tr>
            <tr>
              <td>Student E-Mail</td>

              <td>{studentData.email}</td>
            </tr>
            <tr>
              <td>Cource Name</td>

              <td>{studentData.cource}</td>
            </tr>

            <tr>
              <td>Final Fees</td>

              <td>{studentData.finalFees}</td>
            </tr>
            <tr>
              <td>Other Fees</td>

              <td>{studentData.otherFees}</td>
            </tr>
            <tr>
              <td>Lms Fees</td>

              <td>{studentData.lmsFees}</td>
            </tr>
            <tr>
              <td>Ragistation Fees</td>

              <td>{studentData.ragistationFees}</td>
            </tr>
            <tr>
              <td>Down Payment</td>

              <td>{studentData.downPayment}</td>
            </tr>
            <tr>
              <td>Discount</td>

              <td>{studentData.discount}</td>
            </tr>
            <tr>
              <td>Reamnning Fees</td>

              <td>{studentData.calculatedRemainFees}</td>
            </tr>
            <tr>
              <td>Admission Date</td>

              <td>
                {new Date(studentData.admissiondate).toLocaleDateString()}
              </td>
            </tr>
            <tr>
              <td>Category</td>

              <td>{studentData.category}</td>
            </tr>
            <tr>
              <td>City</td>

              <td>{studentData.city}</td>
            </tr>
            <tr>
              <td>Councelling By</td>

              <td>{studentData.councellingBy}</td>
            </tr>
            <tr>
              <td>Admission By</td>

              <td>{studentData.admissionBy}</td>
            </tr>
            <tr>
              <td>Fees By</td>
              <td>{studentData.feesBy}</td>
            </tr>
            <tr>
              <td>Qulification</td>
              <td>{studentData.degree}</td>
            </tr>

            <tr>
              <td>Installment Fees</td>
              <td>{studentData.installmentAmount}</td>
            </tr>
            <tr>
              <td> Total Installment </td>
              <td>{studentData.installment}</td>
            </tr>
            <tr>
              <td> Total Installment </td>
              <td>{studentData.installment}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SingleStudent;
