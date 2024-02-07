import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import axios from "axios";
import "./invoice.css";
const InvoiceDetailsPage = () => {
  const { id } = useParams();
  const [studentData, setStudentData] = useState(null);
  const { authToken } = useAuth();
  const token = authToken && authToken.token ? authToken.token : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/invoice/students/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
          setStudentData(response.data.invoice); // Access 'invoices' array
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
    <>
      <div
        className="invoicedatils"
        style={{ width: "80%", marginTop: "14%", marginLeft: "17%" }}
      >
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <div className="thistext">
                    <TableCell>Invoice Number</TableCell>
                    <TableCell>Student Name</TableCell>
                    <TableCell>Student Roll Number</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Payment Method</TableCell>
                    <TableCell>Date</TableCell>
                  </div>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentData ? (
                  studentData.map((invoice) => (
                    <TableRow key={invoice._id}>
                      <div className="thistext">
                        <TableCell>{invoice.invoiceNumber}</TableCell>
                        <TableCell>{invoice.studentName}</TableCell>
                        <TableCell>{invoice.studentRollNumber}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell>
                          {new Date(invoice.date).toLocaleDateString()}
                        </TableCell>
                      </div>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>Loading...</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  );
};

export default InvoiceDetailsPage;
