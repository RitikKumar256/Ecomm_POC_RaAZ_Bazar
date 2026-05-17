import React, { useState } from "react";

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const AdminLogin = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  // ================= SEND OTP =================

  const sendOtp = async () => {

    try {

      await axios.post(
        "http://localhost:5454/auth/sent/login-signup-otp",
        {
          email,
        }
      );

      alert("OTP Sent Successfully");

      setOtpSent(true);

    } catch (error) {

      console.log(error);

      alert("Failed to send OTP");

    }
  };

  // ================= VERIFY OTP =================

  const verifyOtp = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5454/auth/signin",
        {
          email,
          otp,
        }
      );

      console.log("admin login success", response.data);

      // SAVE JWT
      localStorage.setItem("admin_jwt", response.data.jwt);

      // SAVE ROLE
      localStorage.setItem("role", response.data.role);

      // CHECK ADMIN
      if (response.data.role === "ROLE_ADMIN") {

        navigate("/admin");

      } else {

        alert("You are not admin");

      }

    } catch (error) {

      console.log(error);

      alert("Invalid OTP");

    }
  };

  return (

    <Box
      className="flex justify-center items-center"
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >

      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: 400,
          borderRadius: 3,
        }}
      >

        <Typography
          variant="h4"
          textAlign="center"
          mb={4}
          fontWeight="bold"
        >
          Admin OTP Login
        </Typography>

        {/* EMAIL */}

        <TextField
          fullWidth
          label="Admin Email"
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* OTP FIELD */}

        {otpSent && (

          <TextField
            fullWidth
            label="Enter OTP"
            margin="normal"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        )}

        {/* BUTTONS */}

        {!otpSent ? (

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
            }}
            onClick={sendOtp}
          >
            Send OTP
          </Button>

        ) : (

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
            }}
            onClick={verifyOtp}
          >
            Verify OTP
          </Button>

        )}

      </Paper>

    </Box>
  );
};

export default AdminLogin;