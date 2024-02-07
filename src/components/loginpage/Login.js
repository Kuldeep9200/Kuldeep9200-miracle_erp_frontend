import React, { useState } from "react";
import "./login.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Destructure only the necessary value
  const navigate = useNavigate();
  const location = useLocation();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data && res.data.success) {
        toast.success("Login successful");

        login({
          user: res.data.user,
          token: res.data.authtoken,
        });

        // Save the token to localStorage
        localStorage.setItem("auth-token", res.data.authtoken);

        // Redirect based on user role
        if (res.data.user.role === 0) {
          navigate("/dashboard");
        } else if (res.data.user.role === 1) {
          navigate("/admindashboard");
        } else {
          // Handle other roles or scenarios if needed
          navigate("/dashboard");
        }
      } else {
        // Display error message from the server response
        toast.error(
          res.data?.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error(error);

      // Display error message from the error response
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "Something went wrong. Please try again.";

      toast.error(errorMessage);
    }
  };

  return (
    <div style={{ marginTop: "4%" }}>
      
      <ToastContainer />
      <h2>Login Page</h2>
      <div className="container" id="container">
        <div className="overlay-container">
          <div className="overlay"> </div>
        </div>

        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <img
              src={require("../../assest/newlogowebpre.png")}
              className="logoerp"
              alt="Image1"
            />
            <h6>SIGN INTO YOUR ACCOUNT</h6>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <NavLink to="/" className="mt-3">
              Forgot your password?
            </NavLink>
            <NavLink to="/register" className="mt-3">
              {" "}
              {/* Corrected typo */}
              Register
            </NavLink>
            <button className="myloginbutton" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
