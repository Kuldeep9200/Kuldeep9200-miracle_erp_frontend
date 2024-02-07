import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./invoice.css";
import { useNavigate } from "react-router-dom";
import InvoiceDetails from "./InvoiceDesign";

const columns = [
  { id: "name", label: "Invoice No", minWidth: 170 },
  {
    id: "studentid",
    label: "Name",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  { id: "code", label: "From No", minWidth: 100 },
  {
    id: "Cource",
    label: "Course",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "DownPayment",
    label: " Fees",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Fees",
    label: "Down Payment",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "MobileNo",
    label: "Date",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "emailId",
    label: "Mode ",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(
  name,
  studentid,
  code,
  Cource,
  Fees,
  DownPayment,
  MobileNo,
  emailId,
  id
) {
  return {
    name,
    studentid,
    code,
    Cource,
    Fees,
    DownPayment,
    MobileNo,
    emailId,
    id,
  };
}

export default function StickyHeadTable() {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const token = authToken && authToken.token ? authToken.token : null;
  console.log(authToken);
  const [rows, setRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleView = (row) => {
    setSelectedInvoice(row);
    setIsModalOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/invoice/get-invoices",
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );

        const invoicesData = response.data.invoices;
        const mappedRows = invoicesData.map((invoice) =>
          createData(
            invoice.invoiceNumber,
            invoice.studentName,
            invoice.studentRollNumber,
            invoice.fromnumber,
            invoice.cource,
            invoice.amount,
            formatDate(invoice.date),
            invoice.paymentMethod,
            invoice.student
          )
        );

        setRows(mappedRows);

        function formatDate(dateString) {
          const options = { day: "2-digit", month: "2-digit", year: "numeric" };
          const formattedDate = new Date(dateString).toLocaleDateString(
            "en-GB",
            options
          );
          return formattedDate;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);
  console.log(filteredRows);
  useEffect(() => {
    const filtered = rows.filter((row) => {
      return Object.values(row).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredRows(filtered);
  }, [searchTerm, rows]);

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ position: "absolute", top: 10, right: 16, width: 200 }}
        />
        <TableContainer sx={{ maxHeight: 440, textAlign: "center" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell key="view" align="center">
                  Action
                </TableCell>
                <TableCell key="viewmore" align="center">
                  View More
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                  <TableCell key="view" align="center">
                    <button
                      onClick={() => handleView(row)}
                      style={{
                        width: "76px",
                        borderRadius: "8px",
                        border: "none",
                        background: "#474768",
                        color: "white",
                      }}
                    >
                      Invoice
                    </button>
                  </TableCell>
                  <TableCell key="viewmore" align="center">
                    <NavLink
                      to={`/singleinvoice/${row.id}`} // Pass the invoice ID as a parameter
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <button
                        style={{
                          width: "76px",
                          borderRadius: "8px",
                          border: "none",
                          background: "#474768",
                          color: "white",
                        }}
                      >
                        View More
                      </button>
                    </NavLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Invoice Details</DialogTitle>
        <DialogContent>
          <InvoiceDetails selectedInvoice={selectedInvoice} />
          {/* <p>Invoice Number: {selectedInvoice.name}</p>
          <p>Student ID: {selectedInvoice.studentid}</p>
          <p>Mobile Number: {selectedInvoice.MobileNo}</p>
          <p>Mobile Number c: {selectedInvoice.code}</p>
          <p>Mobile Number: {selectedInvoice.emailId}</p>
          <p>Mobile Number: {selectedInvoice.DownPayment}</p> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
