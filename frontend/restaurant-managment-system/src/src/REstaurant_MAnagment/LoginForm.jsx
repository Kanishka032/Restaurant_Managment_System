import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import foodImage from "../Assets/Food.webp"; // Using '../' to go up one level

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("MANAGER");
  const [message, setMessage] = useState("");
  const [branch, setBranch] = useState("1");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/user/login?email=${email}&password=${password}&role=${role}&branch=${branch}`
      );

      if (response.data.includes("Login successful")) {
        if (role === "MANAGER") {
          navigate("/manager-dashboard", { state: { branchId: branch } });
        } else if (role === "STAFF") {
          navigate("/staff-dashboard", { state: { branchId: branch } });
        }
      } else {
        setMessage(response.data);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Error logging in. Please try again.");
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
 
      backgroundImage: `url(${foodImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      backgroundBlendMode: "multiply",
    },
    formContainer: {
      backgroundColor: "#1e1e1e",
      padding: "40px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
      width: "400px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "white",
      marginBottom: "30px",
    },
    inputField: {
      width: "100%",
      padding: "12px",
      marginBottom: "20px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#333",
      color: "white",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#e53935",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "20px",
    },
    forgotPassword: {
      color: "#9e9e9e",
      fontSize: "14px",
      marginTop: "10px",
      alignSelf: "flex-end",
      cursor: "pointer",
    },
    radioContainer: {
      display: "flex",
      justifyContent: "space-around",
      marginBottom: "15px",
      width: "100%",
    },
    radioLabel: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "16px",
      color: "#9e9e9e",
    },
    selectField: {
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      marginBottom: "20px",
      backgroundColor: "#333",
      color: "white",
    },
    register: {
      color: "#9e9e9e",
      fontSize: "14px",
      marginTop: "20px",
    },
    registerLink: {
      color: "#e53935",
      textDecoration: "none",
      fontWeight: "bold",
    },
    errorMessage: {
      color: "#e53935",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login</h2>
        {message && <p style={styles.errorMessage}>{message}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.inputField}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.inputField}
        />
        <div style={styles.radioContainer}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              value="STAFF"
              checked={role === "STAFF"}
              onChange={() => setRole("STAFF")}
            />
            Staff
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              value="MANAGER"
              checked={role === "MANAGER"}
              onChange={() => setRole("MANAGER")}
            />
            Manager
          </label>
        </div>
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          style={styles.selectField}
        >
          <option value="1">Branch 1</option>
          <option value="2">Branch 2</option>
          <option value="3">Branch 3</option>
        </select>
        {/* <p style={styles.forgotPassword}>Forgot Password?</p> */}
        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>
        
      </div>
    </div>
  );
};

export default LoginForm;