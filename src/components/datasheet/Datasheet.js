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
import { useAuth } from "../context/AuthContext";
// import SingleStudent from "./SingleStudent";
import { useNavigate } from "react-router-dom";
function formatDate(value) {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const date = new Date(value);
  return date.toLocaleDateString("en-GB", options);
}
const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "studentid",
    label: "Father Name",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  { id: "code", label: "Category", minWidth: 100 },
  {
    id: "Cource",
    label: "Father Occupation",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Fees",
    label: "City",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "DownPayment",
    label: "12th Percentage",
    minWidth: 170,
    align: "right",
    format: (value) => `${value}%`,
  },
  {
    id: "MobileNo",
    label: "Mobile No",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "source",
    label: "Source",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "telicoller",
    label: "Telecaller",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "counclingby",
    label: "Counsellor",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "emailId",
    label: "Email ID",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "createat",
    label: "Date",
    minWidth: 170,
    align: "right",
    format: (value) => formatDate(value),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
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
  source,
  telicoller,
  counclingby,
  emailId,
  createat,
  status,
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
    source,
    telicoller,
    counclingby,
    emailId,
    createat: formatDate(createat),
    status,
    id,
  };
}

export default function StickyHeadTable() {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const token = authToken && authToken.token ? authToken.token : null;
  console.log(token);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [totalAdmission, setTotalAdmission] = useState({
    success: false,
    countTotal: 0,
    message: "",
    admission: [],
  });
  // const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const handleRowClick = (inquries) => {
    setSelectedRow(inquries);
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUpdateProfile = () => {
    // Handle logic for updating profile
    const Id = selectedRow.id;
    navigate(`/inquri/${Id}`);
  };

  // const handleViewProfile = () => {
  //   // Assuming selectedRow contains the ID of the profile you want to view
  //   const Id = selectedRow.id;

  //   // Redirect to the profile details page with the selected profile ID
  //    navigate(`/profile/${Id}`);
  // };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          setLoading(false);
          return;
        }
        // Fetch inquiry data
        const inquiryResponse = await axios.get(
          "http://localhost:5000/api/inquiry/get-inquri",
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );

        const inquiryData = inquiryResponse.data.inquries;
        console.log(inquiryData);
        // Fetch admission data
        const admissionResponse = await axios.get(
          "http://localhost:5000/api/student/get-student",
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );

        const admissionData = admissionResponse.data.admission;
        console.log(admissionResponse.data.admission);
        // Continue with your existing code...
        setLoading(false);
        console.log("API Response:", inquiryResponse.data.length);
        if (Array.isArray(inquiryData)) {
          const mappedRows = inquiryData.map((inquries) =>
            createData(
              inquries.name,
              inquries.fatherName, // Adjust property name
              inquries.category, // Adjust property name
              inquries.fatherOccuption, // Adjust property name
              inquries.city, // Adjust property name
              inquries.class12thparcent, // Adjust property name
              inquries.mobileNumber, // Adjust property name
              inquries.source,
              inquries.telicaller,
              inquries.counclingby,
              inquries.email, // Adjust property name
              inquries.createdAt,
              inquries.status,
              inquries._id
            )
          );

          const coloredRows = mappedRows.map((inquiryRow) => {
            const matchingAdmission = admissionData.find(
              (admissionRow) =>
                admissionRow.mobileNumber === inquiryRow.MobileNo &&
                admissionRow.email === inquiryRow.emailId
            );

            if (matchingAdmission) {
              return { ...inquiryRow, isMatching: true };
            } else {
              return { ...inquiryRow, isMatching: false };
            }
          });

          setRows(coloredRows);

          setTotalAdmission({
            success: inquiryResponse.data.success,
            countTotal: inquiryResponse.data.totalCount,
            message: inquiryResponse.data.inquries.message,
            admission: coloredRows,
          });
        } else {
          console.error("Invalid data format:", inquiryData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);
  useEffect(() => {
    console.log("Search Term:", searchTerm);
    console.log("Rows:", rows);
    // Update filtered rows when the search term changes
    const filtered = rows.filter((row) => {
      return Object.values(row).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    console.log("Filtered Rows:", filtered);
    setFilteredRows(filtered);
  }, [searchTerm, rows]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="totalstudent" style={{ display: "flex" }}>
        <p>Total Inquiry: {totalAdmission.countTotal}</p>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ position: "absolute", top: 10, right: 16, width: 200 }}
        />
        <TableContainer sx={{ maxHeight: 440 }}>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row, index) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={index}
                  onClick={() => handleRowClick(row)}
                  style={{
                    backgroundColor: row.isMatching ? "yellow" : "inherit",
                    cursor: "pointer",
                  }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof row[column.id] === "number"
                        ? column.format(row[column.id])
                        : row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog open={isModalOpen} onClose={handleModalClose}>
        <DialogTitle>Profile Options</DialogTitle>
        <DialogContent>
          {/* Display details of the selected row if needed */}
          {/* ... (you can customize this part based on your requirements) */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateProfile} color="primary">
            Update Profile
          </Button>
          {/* <Button onClick={handleViewProfile} color="primary">
            View Profile
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}
