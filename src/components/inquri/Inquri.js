import React,{useState,useEffect} from "react";
import Datasheet from "../datasheet/Datasheet";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { NavLink } from "react-router-dom";
import AnimatedDivs from "../LodingPage";
const Inquri = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate loading delay (you can replace this with actual data fetching logic)
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after delay (or after data fetching completes)
    }, 1500); // Adjust the delay as needed

    // Clean-up function to clear the timer if component unmounts before the delay completes
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {isLoading ? (
        <div>
          <AnimatedDivs />
        </div>
      ) : (
        <div className="maincontainer">
          <div className="card">
            <div className="card-body erpbody">
              <h5 className="erpdaspoard1">Center Dasboard</h5>
              <h6 className="admissionf1">
              <NavLink to="/dashboard">Home</NavLink> <KeyboardDoubleArrowRightOutlinedIcon /> Inquiry
              </h6>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body erpdasboardcard">
              <div className="datetime">
                <label for="start">Shorting Type:</label>
                <select id="cars">
                  <option value="volvo" className="dates">
                    Date
                  </option>
                  <option value="saab" className="dates">
                    Month
                  </option>
                  <option value="opel" className="dates">
                    Year
                  </option>
                </select>
              </div>
              <div className="datetime">
                <label for="start">Start date:</label>
                <input
                  type="date"
                  // id="start"
                  // name="kuldeep"
                  // value={startDate}
                  // min="2018-01-01"
                  // max="2018-12-31"
                  className="startdete1"
                  // onChange={handleStartDateChange}
                />
              </div>
              <div className="datetime">
                <label for="end">End date:</label>
                <input
                  type="date"
                  id="end"
                  name="trip-end"
                  // value={endDate}
                  // min="2018-01-01"
                  // max="2018-12-31"
                  // onChange={handleEndDateChange}
                />
              </div>
            </div>
          </div>

          <div className="card mt-3 mb-3 buttoncard">
            <div className=" cardbuttonnew">
              <NavLink to="/create/inquri">
                <button className="createnew"> CREATE NEW</button>
              </NavLink>
              <button className="createnew"> MULTI EDIT</button>
            </div>
            <Datasheet />
          </div>
        </div>
      )}
    </>
  );
};

export default Inquri;
