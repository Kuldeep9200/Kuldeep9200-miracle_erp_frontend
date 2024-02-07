import { useState, useEffect } from "react";
import "./admission.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { useAuth } from "../context/AuthContext";

const CreatAdmissionFrom = () => {
  const { id } = useParams();
  const { authToken } = useAuth();
  const token = authToken && authToken.token ? authToken.token : null;
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    studentid: "",
    email: "",
    fromnumber: "",
    admissiondate: "",
    cource: "",
    totalFees: "",
    discount: "",
    otherFees: "",
    lmsFees: "",
    name: "",
    dateofBrearth: "",
    gender: "",
    category: "",
    residenceAddress: "",
    permanentAddress: "",
    city: "",
    mobileNumber: "",
    parentsContact: "",
    degree: "",
    passingYear: "",
    university: "",
    result: "",
    admissionBy: "",
    remark: "",
    ragistationFees: "",
    feesBy: "",
    councellingBy: "",
    downPayment: "",
    installment: "",
    installmentAccount: "",
    downPaymentdate: "",
    emistartDate: "",
  });

  useEffect(() => {
    if (id) {
      fetchAdmissionData();
      setIsUpdating(true);
    }
  }, [id]);

  const fetchAdmissionData = async () => {
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
      setFormData(response.data.admission);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdating) {
        await updateStudent();
      } else {
        await createStudent();
      }
    } catch (error) {
      console.error("API Error:", error);
      // Display error message using toast
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };

  const createStudent = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/student/add-student",
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

  const updateStudent = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/student/update-student/${id}`,
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
        isUpdating ? "Updated Successfully" : "Admission Created Successfully"
      );
      navigate("/admission");
    } else {
      toast.error(response.data?.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calculateTotalFees = () => {
    const { totalFees, discount, otherFees, lmsFees } = formData;
    const calculatedTotal =
      parseFloat(totalFees || 0) -
      parseFloat(discount || 0) +
      parseFloat(otherFees || 0) +
      parseFloat(lmsFees || 0);
    return calculatedTotal.toFixed(2);
  };

  const calculateRemainingFees = () => {
    const totalFees = parseFloat(calculateTotalFees());
    const totalDownPayment = parseFloat(formData.downPayment || 0);
    const totalRegistrationFees = parseFloat(formData.ragistationFees || 0);
    const remainingFees = totalFees - totalDownPayment - totalRegistrationFees;
    return remainingFees.toFixed(2);
  };

  return (
    <>
      <ToastContainer />
      <div className="maincontainer">
        <div className="card">
          <div className="card-body erpbody">
            <h5 className="erpdaspoard1"> Create Admission From</h5>
            <h6 className="admissionf1">
              {" "}
              Home <KeyboardDoubleArrowRightOutlinedIcon />
              Create Admission From
            </h6>
          </div>
        </div>
        <div className="card cardmycreatadmmiation mt-5 ">
          <form onSubmit={handleSubmit}>
            <div className="createadnisstion">
              <div className="datetime123">
                <label htmlhtmlFor="todo1">Student ID :</label>
                <input
                  type="text"
                  id="studentid"
                  name="studentid"
                  value={formData.studentid}
                  onChange={handleChange}
                />
              </div>
              <div className="datetime123">
                <label htmlFor="todo2">Admission From Number:</label>
                <input
                  id="fromnumber"
                  name="fromnumber"
                  type="text"
                  value={formData.fromnumber}
                  onChange={handleChange}
                />
              </div>
              <div className="datetime123">
                <label htmlFor="todo3">Admission Date:</label>
                <input
                  type="date"
                  id="admissiondate"
                  name="admissiondate"
                  value={formData.admissiondate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="createadnisstion">
              <div className="datetime123">
                <label htmlFor="cource">Course:</label>
                <select
                  id="cource"
                  name="cource"
                  value={formData.cource}
                  onChange={handleChange}
                  style={{ backgroundColor: "#ececec", border: "none" }}
                >
                  <option value="">Select a course</option>
                  <option value="PGDFE">PGDFE</option>
                  <option value="PGDIE">PGDIE</option>
                  <option value="ADWD">ADWD</option>
                  <option value="ADSD">ADSD</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>

              <div className="datetime123">
                <label htmlFor="todo5">Fees:</label>
                <input
                  type="number"
                  id="totalFees"
                  name="totalFees"
                  value={formData.totalFees}
                  onChange={handleChange}
                />
              </div>
              <div className="datetime123">
                <label htmlFor="todo6">Discount:</label>
                <input
                  type="number"
                  name="discount"
                  id="discount"
                  value={formData.discount}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="createadnisstion">
              <div className="datetime123">
                <label htmlFor="todo7">Other Fees:</label>
                <input
                  type="text"
                  id="otherFees"
                  name="otherFees"
                  value={formData.otherFees}
                  onChange={handleChange}
                />
              </div>

              <div className="datetime123">
                <label htmlFor="todo9">LMS Fees:</label>
                <input
                  type="number"
                  name="lmsFees"
                  id="lmsFees"
                  value={formData.lmsFees}
                  onChange={handleChange}
                />
              </div>
              <div className="datetime123">
                <label htmlFor="todo8"> Total Fees:</label>
                <input
                  type="text"
                  id="totalFees"
                  name="totalFees"
                  value={calculateTotalFees()}
                  readOnly // Make it read-only
                />
              </div>
            </div>
            <div className="createadnisstion">
              <div className="datetime123">
                <label htmlFor="todo10">Full Name :</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="datetime123">
                <label htmlFor="todo11">Date Of Birth:</label>
                <input
                  type="date"
                  id="dateofBrearth"
                  name="dateofBrearth"
                  value={formData.dateofBrearth}
                  onChange={handleChange}
                />
              </div>
              <div className="datetime123">
                <label htmlFor="todo12">Gender:</label>
                <select
                  type="text"
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select a Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="createadnisstion">
              <div className="datetime123">
                <label htmlFor="todo13">Category:</label>
                <select
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="option2">ST</option>
                  <option value="option2">SC</option>
                </select>
              </div>
              <div className="datetime123">
                <label htmlFor="todo14">Residence Address:</label>
                <input
                  type="text"
                  id="residenceAddress"
                  name="residenceAddress"
                  value={formData.residenceAddress}
                  onChange={handleChange}
                />
              </div>
              <div className="datetime123">
                <label htmlFor="todo15">Permanent Address:</label>
                <input
                  type="text"
                  name="permanentAddress"
                  id="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="createadnisstion">
              <div className="datetime123">
                <label htmlFor="todo16">City :</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="datetime123">
                <label htmlFor="todo17">Contact:</label>
                <input
                  type="number"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="datetime123">
                <label htmlFor="todo18">Parent's Contact:</label>
                <input
                  type="number"
                  name="parentsContact"
                  id="parentsContact"
                  value={formData.parentsContact}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="createadnisstion">
              <div className="datetime123">
                <label htmlFor="todo19">Email ID :</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="datetime123">
                <label htmlFor="todo20">Photo:</label>
                <input
                  type="file"
                  name="photo"
                  // value={photo}
                  // accept="image/*"
                  // onChange={(e) => setPhoto(e.target.files[0])}
                />
              </div>
              <div className="datetime123">
                <label htmlFor="todo21">Degree :</label>
                <input
                  type="text"
                  name="degree"
                  id="degree"
                  value={formData.degree}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="createadnisstion">
              <div className="datetime123">
                <label htmlFor="todo22">Passing Year :</label>
                <select
                  type="date"
                  id="passingYear"
                  name="passingYear"
                  value={formData.passingYear}
                  onChange={handleChange}
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
                <label htmlFor="todo23">University:</label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                />
              </div>
              <div className="datetime123">
                <label htmlFor="todo24">Result :</label>
                <input
                  type="text"
                  name="result"
                  id="result"
                  value={formData.result}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="createadnisstion">
              <div className="datetime123">
                <label htmlFor="todo25">Admission By :</label>
                <select
                  className="datetime12"
                  // placeholder="Name"
                  name="admissionBy"
                  id="admissionBy"
                  value={formData.admissionBy}
                  onChange={handleChange}
                >
                  <option value="">Admission By</option>
                  <option value="Amit Sir">Amit Sir</option>
                  <option value="Pranjali Ma'am">Pranjali Ma'am</option>
                  <option value="Abhisek Sir">Abhisek Sir</option>
                  <option value="Kamlesh Sir">Kamlesh Sir</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>
              <div className="datetime123">
                <label htmlFor="todo25">Remark:</label>
                <input
                  type="text"
                  // placeholder="Name"
                  name="remark"
                  id="remark"
                  value={formData.remark}
                  onChange={handleChange}
                />
              </div>
              <div className="datetime123">
                <label htmlFor="todo26">Ragistation Fees :</label>
                <input
                  type="number"
                  // placeholder="jbjb"
                  id="ragistationFees"
                  name="ragistationFees"
                  value={formData.ragistationFees}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="createadnisstion112">
              <div className="datetime123112" style={{ marginLeft: "4%" }}>
                <label htmlFor="todo27">Fees By :</label>
                <select
                  type="text"
                  id="feesBy"
                  name="feesBy"
                  value={formData.feesBy}
                  onChange={handleChange}
                  style={{ backgroundColor: "#ececec", border: "none" }}
                >
                  <option value="">Fees By</option>
                  <option value="Online">Online</option>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                </select>
              </div>
              <div className="datetime123112" style={{ marginLeft: "9%" }}>
                <label htmlFor="todo28">Councelling By:</label>
                <input
                  type="text"
                  id="councellingBy"
                  name="councellingBy"
                  value={formData.councellingBy}
                  onChange={handleChange}
                  style={{ backgroundColor: "#ececec", border: "none" }}
                />
              </div>
            </div>
            <div className="social-media mt-3 mb-3">
              <h3 className="socialmedia-heading mt">Social Account Detail</h3>
              <hr />
            </div>
            <div className="socialmedai-account">
              <div className="account"></div>
              <div className="account"></div>
            </div>
            <div className="social-media mt-3 mb-3">
              <h3 className="socialmedia-heading mt">
                Fees Installment Detail
              </h3>
              <hr />
              <div className="createadnisstion">
                <div className="datetime123">
                  <label htmlFor="todo29"> Down Payment :</label>
                  <input
                    type="number"
                    id="downPayment"
                    name="downPayment"
                    value={formData.downPayment}
                    onChange={handleChange}
                  />
                </div>
                <div className="datetime123">
                  <label htmlFor="todo30">Down Payment Date:</label>
                  <input
                    type="date"
                    id="downPaymentdate"
                    name="downPaymentdate"
                    value={formData.downPaymentdate}
                    onChange={handleChange}
                  />
                </div>
                <div className="datetime123">
                  <label htmlFor="todo31">Remain Fees:</label>
                  <input
                    type="text"
                    id="remainingFees"
                    name="remainingFees"
                    value={calculateRemainingFees()}
                    readOnly // Make it read-only
                  />
                </div>
              </div>
              <div className="createadnisstion">
                <div className="datetime123">
                  <label htmlFor="todo32">Installment :</label>
                  <input
                    type="text"
                    id="installment"
                    name="installment"
                    value={formData.installment}
                    onChange={handleChange}
                  />
                </div>
                <div className="datetime123">
                  <label htmlFor="todo33">Installment Account:</label>
                  <input
                    type="text"
                    id="installmentAccount"
                    name="installmentAccount"
                    value={formData.installmentAccount}
                    onChange={handleChange}
                  />
                </div>
                <div className="datetime123">
                  <label htmlFor="todo34">EMI Start Date:</label>
                  <input
                    type="date"
                    name="emistartDate"
                    id="emistartDate"
                    value={formData.emistartDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div
              className="createadnisstionbutton"
              style={{ textAlign: "right" }}
            >
              <button className="submitbutton" type="submit">
                {id ? "Update" : "Create"} Admission
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatAdmissionFrom;
