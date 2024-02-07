import React from "react";
import "./dasboard.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Dasboard = () => {
  const { authToken, logout } = useAuth();

  const user = authToken && authToken.user ? authToken.user : null;
  const handleLogout = () => {
    // Instead of setAuth, use the logout function from the useAuth hook
    logout();
    // You don't need to manually clear the user and token here since the logout function takes care of that.
  };

  // Call the function to fetch the data

  return (
    <div>
      <div className="centerdasboard">
        <h5 className="centerh3">
          <li className="nav-item dropdown">
            <NavLink
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {user?.name}
            </NavLink>
            <ul className="dropdown-menu">
              {/* <li>
                        <NavLink className="dropdown-item" to={`/dasboard/${auth?.user?.role===1 ? 'admin':'user'}`}>
                          Dasboard
                        </NavLink>
                      </li> */}
              <li className="nav-item">
                <NavLink
                  onClick={handleLogout}
                  className="nav-link newitem"
                  to="/"
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </li>
        </h5>
        <p className="centerp">Last Login 20-10-2023</p>
        <p className="centerp">Welcome To {user?.name}- Center</p>
      </div>
      <div className="row mt-5 ceanterboardmain">
        <div className="col-sm-5">
          <div
            className="card dacrboadcard"
            style={{ height: "27rem", cursor: "pointer" }}
          >
            <div className="card-body">
              <h5 className="thistitel">Notification</h5>
              <hr />
              <div id="scroll-container">
                <div id="scroll-text">
                  This is scrolling text.
                  <br />
                  This is scrolling text.
                  <br />
                  This is scrolling text.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-7 padding7">
          <div className="row">
            <div className="col-sm-4 mt-2">
              <div className="card dacrboadcard">
                <NavLink to="/erpdasboard">
                  {" "}
                  <div className="card-body erpcardbody">
                    <img
                      src={require("../../assest/erp1.png")}
                      className="erpitems"
                      alt="Miracle IT Career"
                    />
                    <h5 className="card-title titelcard">ERP</h5>
                  </div>{" "}
                </NavLink>
              </div>
            </div>
            <div className="col-sm-4  mt-2">
              <div className="card dacrboadcard">
                <div className="card-body erpcardbody">
                  <img
                    src={require("../../assest/erp2.png")}
                    className="erpitems"
                    alt="Miracle IT Career"
                  />
                  <h5 className="card-title titelcard">Reports</h5>
                </div>
              </div>
            </div>
            <div className="col-sm-4  mt-2">
              <div className="card dacrboadcard">
                <div className="card-body erpcardbody">
                  <img
                    src={require("../../assest/erp3.png")}
                    className="erpitems"
                    alt="Miracle IT Career"
                  />
                  <h5 className="card-title titelcard">LMS</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-sm-6  mt-2">
              <div className="card dacrboadcard">
                <NavLink to="/datasheet">
                  <div className="card-body erpcardbody">
                    <img
                      src={require("../../assest/erp4.png")}
                      className="erpitems"
                      alt="Miracle IT Career"
                    />
                    <h5 className="card-title titelcard">Inquiry</h5>
                  </div>
                </NavLink>
              </div>
            </div>
            <div className="col-sm-6  mt-2">
              <div className="card dacrboadcard">
                <div className="card-body erpcardbody">
                  <img
                    src={require("../../assest/erp6.png")}
                    className="erpitems"
                    alt="Miracle IT Career"
                  />
                  <h5 className="card-title titelcard">Indent</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-sm-6  mt-2 mb-2">
              <div className="card dacrboadcard">
                <div className="card-body erpcardbody">
                  <img
                    src={require("../../assest/erp5.png")}
                    className="erpitems"
                    alt="Miracle IT Career"
                  />

                  <h5 className="card-title titelcard">Employee </h5>
                </div>
              </div>
            </div>
            <div className="col-sm-6  mt-2 mb-2">
              <div className="card dacrboadcard">
                <div className="card-body erpcardbody">
                  <img
                    src={require("../../assest/erp7.png")}
                    className="erpitems itemserp1"
                    alt="Miracle IT Career"
                  />
                  <h5 className="card-title titelcard">Pelacement</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dasboard;
