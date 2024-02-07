import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !phone) {
      toast.error("Please fill in all the details");
      return;
    }

    const data = { username, email, password, phone };

    fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result.success) {
          toast.success("Registration successful. You can now log in.");

          navigate("/"); // Redirect to home after successful registration
        } else {
          toast.error(
            result.message || "Registration failed. Please try again."
          );
        }
      })
      .catch((error) => {
        console.error("Registration Error:", error);
        toast.error("Something went wrong. Please try again.");
      });
  };

  return (
    <div>
      <ToastContainer
        className="custom-toast-container"
        style={{ zIndex: "1000" }}
      />
      <div style={{ marginTop: "5%" }}>
        <h2>Registration Page</h2>
        <div className="form-container sign-in-container">
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button className="myloginbutton" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
