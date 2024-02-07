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
    label: "Student ID",
    minWidth: 170,
    align: "right",
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
    id: "councellingBy",
    label: "Counsellor",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Fees",
    label: "Fees",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "DownPayment",
    label: "Down Payment",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "MobileNo",
    label: "Mobile No",
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
    id: "createdat",
    label: "Date",
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
  councellingBy,
  Fees,
  DownPayment,
  MobileNo,
  emailId,
  createdat,
  id
) {
  return {
    name,
    studentid,
    code,
    Cource,
    councellingBy,
    Fees,
    DownPayment,
    MobileNo,
    emailId,
    createdat:formatDate(createdat),
    id,
  };
}

export default function StickyHeadTable() {
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { authToken } = useAuth();
  const token = authToken && authToken.token ? authToken.token : null;

  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  
  const [totalAdmission, setTotalAdmission] = useState({
    success: false,
    countTotal: 0,
    message: "",
    admission: [],
    totalDownPayment: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/student/get-student",
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        console.log(response.data);
        const admissionData = response.data.admission;
        setRows(
          admissionData.map((admission) =>
            createData(
              admission.name,

              admission.studentid,
              admission.fromnumber,
              admission.cource,
              admission.councellingBy,
              admission.finalFees,
              admission.downPayment,
              admission.mobileNumber,
              admission.email,
              admission.createdAt,
              // admission.totalFees,
              admission._id
            )
          )
        );
        setTotalAdmission({
          success: response.data.success,
          countTotal: response.data.countTotal,
          message: response.data.message,
          admission: admissionData,
          totalDownPayment: response.data.totalDownPayment,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [token]); // Include token as a dependency

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

  const handleRowClick = (admission) => {
    setSelectedRow(admission);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUpdateProfile = () => {
    // Handle logic for updating profile
    const Id = selectedRow.id;
    navigate(`/admission/${Id}`)
  };

  const handleViewProfile = () => {
    // Assuming selectedRow contains the ID of the profile you want to view
    const Id = selectedRow.id;
  
    // Redirect to the profile details page with the selected profile ID
    navigate(`/profile/${Id}`);
  };
  

  const handleDeleteProfile = async () => {
    try {
      const id = selectedRow.id; // Replace 'studentid' with the actual property name in your 'row' object

      // Make the API call to delete the student
      const response = await axios.delete(
        `http://localhost:5000/api/student/delete-student/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );

      if (response.data.success) {
        // Successfully deleted, you may want to refresh the data or update the UI
        console.log("Student deleted successfully");
        handleModalClose(); // Close the modal after deletion
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <>
      <div className="totalstudent" style={{ display: "flex" }}>
        <p>Total Admission: {totalAdmission.countTotal}</p>
        <p>Total Down Payment: {totalAdmission.totalDownPayment}</p>
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
              {filteredRows.map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.studentid}
                  onClick={() => handleRowClick(row)}
                  style={{ cursor: "pointer" }}
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
          <Button onClick={handleViewProfile} color="primary">
            View Profile
          </Button>
          <Button onClick={handleDeleteProfile} color="secondary">
            Delete Profile
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
