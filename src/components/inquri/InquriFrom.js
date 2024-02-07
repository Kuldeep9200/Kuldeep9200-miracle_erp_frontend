import React, { useState, useEffect } from "react";
import axios from "axios";
import "./inquri.css";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for react-toastify
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const InquiryForm = () => {
  const { id } = useParams();
  const { authToken } = useAuth();
  const token = authToken && authToken.token ? authToken.token : null;
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    category: "",
    fatherName: "",
    fatherMobilenumber: "",
    fatherOccuption: "", // Fixed typo in occupation
    address: "",
    dathofBirth: "", // Fixed typo in variable name
    city: "",
    class10th: "",
    class12th: "",
    diploma: "",
    class10thbord: "", // Changed to class10thboard for consistency
    class10thparcent: "", // Changed to class10thpercent for consistency
    class10thpassingyear: "",
    class12thbord: "", // Changed to class12thboard for consistency
    class12thparcent: "", // Changed to class12thpercent for consistency
    class12thpassingyear: "",
    diplomauniversity: "",
    diplomapercent: "",
    diplomapassingyear: "",
    source: "",
    counclingby: "", // Changed to counsellingBy for consistency
    cource: "", // Changed to course for consistency
    amount: "",
    remark: "",
    telicaller: "", // Changed to telecaller for consistency
    status: "",
    closeReason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const prevStep = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  useEffect(() => {
    if (id) {
      fetchInquiryData(); // Fixed typo in function name
      setIsUpdating(true);
    }
  }, [id]);

  const fetchInquiryData = async () => {
    // Fixed typo in function name
    try {
      const response = await axios.get(
        `http://localhost:5000/api/inquiry/get-inquri/${id}`, // Fixed typo in URL
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      console.log(response.data);
      setFormData(response.data.inquri);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdating) {
        await updateInquiry(); // Fixed typo in function name
      } else {
        await createInquiry(); // Fixed typo in function name
      }
    } catch (error) {
    
      console.error("API Error:", error);
      // Display error message using toast
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const createInquiry = async () => {
    // Fixed typo in function name
    try {
      const response = await axios.post(
        "http://localhost:5000/api/inquiry/addinquri", // Fixed typo in URL
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      handleApiResponse(response);
    } catch (error) {
      console.error("API Error:", error);
      // Display error message using toast
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const updateInquiry = async () => {
    // Fixed typo in function name
    try {
      const response = await axios.put(
        `http://localhost:5000/api/inquiry/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      handleApiResponse(response);
    } catch (error) {
      console.error("API Error:", error);
      // Display error message using toast
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleApiResponse = (response) => {
    if (response.data?.success) {
      toast.success(
        isUpdating ? "Updated Successfully" : "Inquri Created Successfully"
      );
      navigate("/datasheet");
    } else {
      toast.error(response.data?.message);
    }
  };
  // Log the token to the console
  // console.log("Authentication Token:", authToken);
  return (
    <>
     <ToastContainer />
      {step === 1 && (
        <form
          onSubmit={nextStep}
          className="inqurifrom"
          style={{ marginTop: "6%" }}
        >
          <h2 className="detailsfrom">Personal Details</h2>
          <div className="createadnisstion">
            <div className="datetime123">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="datetime123">
              <label htmlFor="mobile">Mobile Number:</label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="createadnisstion">
            <div className="datetime123">
              <label htmlFor="email">Email ID :</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="datetime123">
              <label htmlFor="category">Gender:</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="createadnisstion">
            <div className="datetime123">
              <label htmlFor="dathofBirth">Date Of Birth</label>
              <input
                type="date"
                id="dathofBirth"
                name="dathofBirth"
                value={formData.dathofBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="datetime123">
              <label htmlFor="fatherName"> Father's Name</label>
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="createadnisstion">
            <div className="datetime123">
              <label htmlFor="fatherMobilenumber"> Father Mobile Number:</label>

              <input
                type="text"
                id="fatherMobilenumber"
                name="fatherMobilenumber"
                value={formData.fatherMobilenumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="datetime123">
              <label htmlFor="fatherOccuption">Father's Occupation:</label>
              <input
                type="text"
                id="fatherOccuption"
                name="fatherOccuption"
                value={formData.fatherOccuption}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="createadnisstion">
            <div className="datetime123">
              <label htmlFor="source">Inquiry Source:</label>
              <select
                id="source"
                name="source"
                value={formData.source}
                onChange={handleChange}
                required
              >
                <option value="">Select a source</option>
                <option value="Social Media">Social Media</option>
                <option value="Directly">Directly</option>
                <option value="Telecaller">Telecaller</option>
              </select>
            </div>

            <div className="datetime123">
              <label htmlFor="telicaller">Telecaller:</label>
              <select
                id="telicaller"
                name="telicaller"
                value={formData.telicaller}
                onChange={handleChange}
                required
                disabled={formData.source !== "Telecaller"}
              >
                <option value="">Select a Telecaller</option>
                <option value="Shanti">Shanti</option>
                <option value="Mahima Shikarwar">Mahima Shikarwar</option>
                <option value="Bainarji Ma'am">Bainarji Ma'am</option>
              </select>
            </div>
          </div>
          <div className="createadnisstion">
            <div className="datetime123">
              <label htmlFor="cource"> Cource Name:</label>

              <input
                type="text"
                id="cource"
                name="cource"
                value={formData.cource}
                onChange={handleChange}
                required
              />
            </div>
            <div className="datetime123">
              <label htmlFor="amount">Cource Fees:</label>
              <input
                type="text"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="createadnisstion">
            <div className="datetime123">
              <label htmlFor="counclingby"> Counsellor Name:</label>

              <select
                type="text"
                id="counclingby"
                name="counclingby"
                value={formData.counclingby}
                onChange={handleChange}
                required
              >
                <option value="">Select a Counsellor</option>
                <option value="Amit Sir">Amit Sir</option>
                <option value="Pranjali Maam">Pranjali Ma'am</option>
                <option value="Bainarji Ma'am">Bainarji Ma'am</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="datetime123">
              <label htmlFor="remark">Remark:</label>
              <input
                type="text"
                id="remark"
                name="remark"
                value={formData.remark}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="createadnisstion">
            <div className="datetime123">
              <label htmlFor="address"> Mailling Address:</label>

              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="datetime123">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="datetime123">
            <label htmlFor="diplomapercent">Status:</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Select a Status</option>
              <option value="Running">Running</option>
              <option value="Admitted">Admitted</option>
              <option value="Close">Close</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="buttonsinquri">
            <button
              type="submit"
              className="btn btn-primary invoicebutton"
              style={{ width: "13%" }}
            >
              Next
            </button>
          </div>
          {/* <button type="submit">Next</button> */}
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={handleSubmit}
          className="inqurifrom"
          style={{ marginTop: "6%" }}
        >
          <h2 className="detailsfrom">Educational Details</h2>
          <h3 className="educationdetails" style={{ textAlign: "left" }}>
            {" "}
            Class 10th Details
          </h3>
          <div className="createadnisstion">
            <div className="datetime123">
              <label htmlFor="email">University/Board:</label>
              <input
                type="text"
                name="class10thbord"
                value={formData.class10thbord}
                onChange={handleChange}
                required
              />
            </div>
            <div className="datetime123">
              <label htmlFor="class10th">Subject:</label>
              <input
                id="class10th"
                name="class10th"
                value={formData.class10th}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="createadnisstion">
            <div className="datetime123">
              <label htmlFor="class10thpassingyear">year:</label>
              <select
                type="date"
                name="class10thpassingyear"
                value={formData.class10thpassingyear}
                onChange={handleChange}
                required
              >
                <option value="">Select a year</option>
                {/* You can generate options dynamically if needed */}
                {Array.from({ length: 50 }, (_, index) => {
                  const year = new Date().getFullYear() - index;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="datetime123">
              <label htmlFor="class10thparcent">Percentage:</label>
              <input
                id="class10thparcent"
                name="class10thparcent"
                value={formData.class10thparcent}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <h3 className="educationdetails" style={{ textAlign: "left" }}>
            {" "}
            Class 12th Details
          </h3>
          <div className="createadnisstion">
            <div className="datetime123">
              <label htmlFor="class12thbord">University/Board:</label>
              <input
                type="text"
                name="class12thbord"
                value={formData.class12thbord}
                onChange={handleChange}
                required
              />
            </div>
            <div className="datetime123">
              <label htmlFor="address">Subject:</label>
              <input
                id="class12th"
                name="class12th"
                value={formData.class12th}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="createadnisstion">
            <div className="datetime123">
              <label htmlFor="class12thpassingyear">Year:</label>
              <select
                id="class12thpassingyear"
                name="class12thpassingyear"
                value={formData.class12thpassingyear}
                onChange={handleChange}
                required
              >
                <option value="">Select a year</option>
                {/* You can generate options dynamically if needed */}
                {Array.from({ length: 50 }, (_, index) => {
                  const year = new Date().getFullYear() - index;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="datetime123">
              <label htmlFor="class12thparcent">Percentage:</label>
              <input
                id="class12thparcent"
                name="class12thparcent"
                value={formData.class12thparcent}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <h3 className="educationdetails" style={{ textAlign: "left" }}>
            {" "}
            Graducation Details
          </h3>
          <div className="createadnisstion">
            <div className="datetime123">
              <label htmlFor="diplomauniversity">University/Board:</label>
              <input
                type="text"
                name="diplomauniversity"
                value={formData.diplomauniversity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="datetime123">
              <label htmlFor="diploma">Subject:</label>
              <input
                id="diploma"
                name="diploma"
                value={formData.diploma}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="createadnisstion">
            <div className="datetime123">
              <label htmlFor="diplomapassingyear">year:</label>
              <select
                type="date"
                name="diplomapassingyear"
                value={formData.diplomapassingyear}
                onChange={handleChange}
                required
              >
                <option value="">Select a year</option>
                {/* You can generate options dynamically if needed */}
                {Array.from({ length: 50 }, (_, index) => {
                  const year = new Date().getFullYear() - index;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="datetime123">
              <label htmlFor="diplomapercent">Percentage:</label>
              <input
                id="diplomapercent"
                name="diplomapercent"
                value={formData.diplomapercent}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="buttonsinquri">
            <button
              type="submit"
              class="btn btn-primary invoicebutton"
              style={{ width: "13%" }}
              onClick={prevStep}
            >
              prev Step
            </button>
            {/* <button type="submit">Submit</button> */}
            <button
              type="submit"
              class="btn btn-primary invoicebutton"
              style={{ width: "13%", marginLeft: "11px" }}
            >
              {id ? "Update" : "Create"} Inquiry
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default InquiryForm;
