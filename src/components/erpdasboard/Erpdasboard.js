import { useState, useEffect } from "react";
import axios from "axios";
import "./erpdasboard.css";
import Groups2Icon from "@mui/icons-material/Groups2";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { useAuth } from "../context/AuthContext";
import AnimatedDivs from "../LodingPage";
import { useNavigate } from "react-router-dom";
const Erpdasboard = () => {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const token = authToken && authToken.token ? authToken.token : null;
  const [startDate, setStartDate] = useState("2018-07-22");
  const [endDate, setEndDate] = useState("2018-07-22");
  const [inquiryData, setInquiryData] = useState(null);
  const [admissionData, setAdmissionData] = useState({ totalDownPayment: 0 });
const [invoiceData, setInvoiceData] = useState({ totalAmount: 0 });

  const [error, setError] = useState(null);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const fetchData = async (url, setDataFunction) => {
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      setDataFunction(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData("http://localhost:5000/api/inquiry/get-inquri", setInquiryData);
    fetchData(
      "http://localhost:5000/api/student/get-student",
      setAdmissionData
    );
    fetchData(
      "http://localhost:5000/api/invoice/get-invoice/total-amount",
      setInvoiceData
    );
  }, []);


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!inquiryData || !admissionData || !invoiceData) {
        // Navigate to home page if data fetching fails after 10 seconds
        navigate("/");
      }
    }, 6000);

    return () => clearTimeout(timeoutId); // Clear timeout on component unmount

  }, [inquiryData, admissionData, invoiceData, navigate]);
  
  // Empty dependency array to run only once on component mount
  const total = admissionData.totalDownPayment + invoiceData.totalAmount;


  return (
    <>
     {inquiryData && admissionData && invoiceData ? (
        <div className="maincontainer">
          <div className="card">
            <div className="card-body erpbody">
              <h5 className="erpdaspoard1">Center Dasboard</h5>
              <button className="dasboardbutton">App Store</button>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body erpdasboardcard">
              <div className="datetime">
                <label for="start">Start date:</label>
                <input
                  type="date"
                  // id="start"
                  // name="kuldeep"
                  // value={startDate}
                  // min="2018-01-01"
                  // max="2018-12-31"
                  onChange={handleStartDateChange}
                />
              </div>
              <div className="datetime">
                <label for="end">End date:</label>
                <input
                  type="date"
                  // id="end"
                  // name="trip-end"
                  // value={endDate}
                  // min="2018-01-01"
                  // max="2018-12-31"
                  onChange={handleEndDateChange}
                />
              </div>
              <div className="datetime determinedutton">
                <button className="flexitems">Search</button>
              </div>
            </div>
          </div>

          <div className="row mt-3 rowmt33">
            <div className="col-sm-3 mb-3 mb-sm-0 mt-2">
              <div className="row g-0 erpcard1 h-100">
                <div className="col-md-4 erpdasboardicon">
                  <FormatListNumberedIcon className="dasbordicon" />
                </div>
                <div className="col-md-8">
                  <div className="card-body repcardbody80">
                    <div className="erpcardbodyicon ">
                      <h3 className="erph3 mb-3">C</h3>
                      <h3 className="erph3 mb-3">M</h3>
                    </div>
                    <div className="erpcardprice mt-3">
                      <h3 className=" card-text mycarderptext">
                        {inquiryData.totalCount}
                      </h3>
                      <h5 className=" card-text mycarderptext">
                        Total Inquiry
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3 mt-2">
              <div className="row g-0 erpcard2 h-100">
                <div className="col-md-4 erpdasboardicon">
                  <Groups2Icon className="dasbordicon" />
                </div>
                <div className="col-md-8">
                  <div className="card-body repcardbody80">
                    <div className="erpcardbodyicon ">
                      <h3 className="erph3 mb-3">C</h3>
                      <h3 className="erph3 mb-3">M</h3>
                    </div>
                    <div className="erpcardprice mt-3">
                      <h3 className=" card-text mycarderptext">
                        {admissionData.countTotal}
                      </h3>
                      <h5 className=" card-text mycarderptext">
                        Total Admission
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3 mt-2">
              <div className="row g-0 erpcard3 h-100">
                <div className="col-md-4 erpdasboardicon">
                  <MonetizationOnIcon className="dasbordicon" />
                </div>
                <div className="col-md-8">
                  <div className="card-body repcardbody80">
                    <div className="erpcardbodyicon ">
                      <h3 className=" card-text mycarderptext atulayn">
                      {total}
                      </h3>
                    </div>
                    <div className="erpcardprice mt-3">
                      <h5 className=" card-text mycarderptext">
                        Total Collection
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3 mt-2">
              <div className="row g-0 erpcard4 h-100">
                <div className="col-md-4 erpdasboardicon">
                  <SignalCellularAltIcon className="dasbordicon" />
                </div>
                <div className="col-md-8">
                  <div className="card-body repcardbody80">
                    <div className="erpcardbodyicon ">
                      <h3 className="erph3 mb-3">R</h3>
                      <h3 className="erph3 mb-3">P </h3>
                    </div>
                    <div className="erpcardprice mt-3">
                      <h3 className=" card-text mycarderptext">25,980</h3>
                      <h5 className=" card-text mycarderptext">
                        Apr Outstading
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // <div>Loading...</div> // Show loading message while data is being fetched
        <AnimatedDivs />
      )}
    </>
  );
};

export default Erpdasboard;
