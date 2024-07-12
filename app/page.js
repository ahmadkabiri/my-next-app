"use client";
import { useEffect, useState, useRef } from "react";
import {
  Avatar,
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { logOtpActions, VerifyOtpLoginAction } from "./API/otp";

const Home = () => {
  const [otp, setOTP] = useState(Array(5).fill(""));
  const inputsRef = useRef([]);
  const [response, setResponse] = useState("hichi");

  useEffect(() => {
    const fetchOTP = async () => {
      if ("OTPCredential" in window) {
        const ac = new AbortController();

        try {
          const otpCredential = await navigator.credentials.get({
            otp: { transport: ["sms"] },
            signal: ac.signal,
          });
          // setOTP(otpCredential.code);
          let arrayOfCode = otpCredential.code
            .split("")
            .map((number) => `${number}`);
          logOtpActions("arrayOfCode", arrayOfCode);
          setOTP(arrayOfCode);
          // await handleVerifyOtp({
          //   username: "09028801466",
          //   otp: arrayOfCode,
          // });
          // logOtpActions("otpObj", {
          //   username: values.username,
          //   otp: arrayOfCode,
          // });
          // handleVerifyOtp({
          //   username: values.username,
          //   otp: arrayOfCode,
          // });

          ac.abort();
        } catch (err) {
          ac.abort();
          logOtpActions("Error fetching OTP:", err);
        }
      }
    };

    fetchOTP();

    return () => {
      // Cleanup function
      // Abort any ongoing fetch operation if component unmounts
      console.log("Component unmounted");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleVerifyOtp = async (data) => {
    const response = await VerifyOtpLoginAction(
      data.username,
      Number(data.otp.join("")),
    );

    if (response.error) {
      logOtpActions(response.error);
      return;
    } else {
      logOtpActions(response);
    }
    // const user = await UserAction(0);

    // login(user?.GetUserResult);
    // changeLoading("verifyCode", false);
  };

  const handleInputChange = (index) => (e) => {
    const val = e.target.value;
    const newValues = [...otp];
    newValues[index] = val;
    setOTP(newValues);

    if (index < 4 && val) {
      inputsRef.current[index + 1].focus();
    }
    // if (newValues.every((item) => item !== "" && /^\d$/.test(item))) {
    //   handleSubmit();
    // }
  };

  const handleBackspace = (index) => (e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="App">
      <h1>Hello Next.js9</h1>

      <Box
        sx={{
          display: "flex",
          direction: "rtl",
          gap: "5px",
          justifyContent: "space-between",
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <TextField
            key={index}
            variant="outlined"
            inputRef={(el) => (inputsRef.current[index] = el)}
            value={otp[index]}
            onChange={handleInputChange(index)}
            onKeyDown={handleBackspace(index)}
            inputProps={{ maxLength: 1 }}
            sx={{
              "& .MuiInputBase-input": {
                height: "45px",
                width: "45px",
                padding: "10px",
                textAlign: "center",
                background: "#F3F4F6",
                borderRadius: "10px",
                outline: "none",
              },
            }}
          />
        ))}
      </Box>
      <div>response : {response}</div>
    </div>
  );
};

export default Home;
