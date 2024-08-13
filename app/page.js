"use client";
// import { useEffect, useState, useRef } from "react";
// import {
//   Avatar,
//   Box,
//   FormControl,
//   FormHelperText,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
//   TextField,
//   Typography,
// } from "@mui/material";
import { logOtpActions, VerifyOtpLoginAction } from "./API/otp";

// const Home = () => {
//   const [otp, setOTP] = useState(Array(5).fill(""));
//   const inputsRef = useRef([]);
//   const [response, setResponse] = useState("hichi");

//   useEffect(() => {
//     const fetchOTP = async () => {
//       if ("OTPCredential" in window) {
//         const ac = new AbortController();

//         try {
//           const otpCredential = await navigator.credentials.get({
//             otp: { transport: ["sms"] },
//             signal: ac.signal,
//           });
//           // setOTP(otpCredential.code);
//           logOtpActions(1, 1);
//           let arrayOfCode = otpCredential.code
//             .split("")
//             .map((number) => `${number}`);
//           logOtpActions(2, 2);
//           logOtpActions("arrayOfCode", arrayOfCode);
//           logOtpActions(3, 3);
//           setOTP(arrayOfCode);
//           logOtpActions(4, 4);
//           // await handleVerifyOtp({
//           //   username: "09028801466",
//           //   otp: arrayOfCode,
//           // });
//           // logOtpActions("otpObj", {
//           //   username: values.username,
//           //   otp: arrayOfCode,
//           // });
//           // handleVerifyOtp({
//           //   username: values.username,
//           //   otp: arrayOfCode,
//           // });

//           ac.abort();
//         } catch (err) {
//           ac.abort();
//           logOtpActions("Error fetching OTP:", err);
//         }
//       }
//     };

//     fetchOTP();

//     return () => {
//       // Cleanup function
//       // Abort any ongoing fetch operation if component unmounts
//       console.log("Component unmounted");
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleInputChange = (index) => (e) => {
//     const val = e.target.value;
//     const newValues = [...otp];
//     newValues[index] = val;
//     setOTP(newValues);

//     if (index < 4 && val) {
//       inputsRef.current[index + 1].focus();
//     }
//     // if (newValues.every((item) => item !== "" && /^\d$/.test(item))) {
//     //   handleSubmit();
//     // }
//   };

//   const handleBackspace = (index) => (e) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputsRef.current[index - 1].focus();
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Hello Next.js13</h1>

//       <Box
//         sx={{
//           display: "flex",
//           direction: "rtl",
//           gap: "5px",
//           justifyContent: "space-between",
//         }}
//       >
//         {Array.from({ length: 5 }).map((_, index) => (
//           <TextField
//             key={index}
//             variant="outlined"
//             inputRef={(el) => (inputsRef.current[index] = el)}
//             value={otp[index]}
//             onChange={handleInputChange(index)}
//             onKeyDown={handleBackspace(index)}
//             inputProps={{ maxLength: 1 }}
//             sx={{
//               "& .MuiInputBase-input": {
//                 height: "45px",
//                 width: "45px",
//                 padding: "10px",
//                 textAlign: "center",
//                 background: "#F3F4F6",
//                 borderRadius: "10px",
//                 outline: "none",
//               },
//             }}
//           />
//         ))}
//       </Box>
//       <div>response : {response}</div>
//     </div>
//   );
// };

// export default Home;
import React, { useState, createRef, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {
  Button,
  // Grid,
  // Skeleton,
  // Stack,
  // Typography,
  // Avatar,
} from "@mui/material";
// import UserContext from "@/contexts/userContext";
// import { useTranslations } from "next-intl";
// import MDButton from "@/components/MD/MDButton";
// import CustomizedSnackbars from "../reusableComponents/Snackbar";
// import PageLoader from "../reusableComponents/Loader";
const ForgetPassOTP = ({ mobilNum, setLoginState }) => {
  const inputsRef = React.useRef([]);
  const [values, setValues] = useState(Array(5).fill(""));
  const [loading, setLoading] = React.useState(false);
  // const { user, setUser, fetchUser } = useContext(UserContext);
  const [error, setError] = React.useState(false);

  // const [snackBar, setSnackBar] = useState({
  //   message: "",
  //   open: false,
  //   type: "error",
  // });

  // const closeSnackbar = () => {
  //   setSnackBar((prev) => ({
  //     ...prev,
  //     open: false,
  //   }));
  // };

  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, 5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          logOtpActions(1, 1);
          let arrayOfCode = otpCredential.code
            .split("")
            .map((number) => `${number}`);
          logOtpActions(2, 2);
          logOtpActions("arrayOfCode", arrayOfCode);
          logOtpActions(3, 3);
          setValues(arrayOfCode);
          logOtpActions(4, 4);
          logOtpActions("7", "bepar login kon");
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

  // const t = useTranslations("auth");

  // useEffect(() => {
  //   const getSMS = async () => {
  //     const userInput = values.join("");

  //     try {
  //       setLoading(true);
  //       // Construct the API URL
  //       const apiUrl = `/api/auth/sendcode?pn=${mobilNum}`;

  //       // Make a POST request
  //       const response = await fetch(apiUrl, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (response.ok) {
  //         setLoading(false);
  //         setSnackBar({
  //           open: true,
  //           type: "success",
  //           message: t("Codesent"),
  //         });
  //       }

  //       if (!response.ok) {
  //         setLoading(false);
  //       }

  //       const data = await response.json();
  //     } catch (error) {
  //       setError(true);
  //       setSnackBar({
  //         open: true,
  //         type: "error",
  //         message: t("error"),
  //       });
  //     }
  //   };
  //   getSMS();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [mobilNum]);

  const handleInputChange = (index) => (e) => {
    const val = e.target.value;
    const newValues = [...values];
    newValues[index] = val;
    setValues(newValues);

    if (index < 4 && val) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleBackspace = (index) => (e) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    logOtpActions(5, 5);
    const paste = e.clipboardData.getData("text");
    logOtpActions("paste", paste);
    if (paste.length === 5 && /^\d{5}$/.test(paste)) {
      const newValues = paste.split("");
      setValues(newValues);
      newValues.forEach((val, index) => {
        if (inputsRef.current[index]) {
          inputsRef.current[index].value = val;
        }
      });
      // handleSubmit();
    }
    e.preventDefault();
  };

  const verifyCode = async (e) => {
    const userInput = values.join("");

    e.preventDefault();

    try {
      setLoading(true);
      // Construct the API URL
      const apiUrl = `/api/auth/vrifyCode?pn=${mobilNum}&code=${userInput}`;

      // Make a POST request
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setLoading(false);

        setLoginState("SetPassword");
      }

      if (!response.ok) {
        setLoading(false);
        throw new Error(`Failed to verify OTP. Status: ${response.status}`);
      }

      const data = await response.json();
    } catch (error) {
      // console.log("Ee");
      setError(true);
      setSnackBar({
        open: true,
        type: "error",
        message: t("confirmationCodeReject"),
      });
    }
  };

  return (
    <>
      {/* <PageLoader isLoading={loading} /> */}
      <Box
        sx={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundColor: "#D4D4D4",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "100",
            fontSize: 12,
            backgroundColor: "#ffff",
            width: { xs: "90%", md: "50%", lg: "40%" },
            maxWidth: "500px",
            gap: "20px",
            padding: "2rem",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            borderRadius: "0.5rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box>
            {/* <Avatar
              sx={{ width: "60px", height: "60px" }}
              alt="anea-logo"
              src="/images/anea.png"
            /> */}
          </Box>
          <Box>
            {/* <Typography component="h1" variant="h5" mb={5}>
              {t("enterVerificationCode")}
            </Typography> */}
          </Box>
          <div style={{ display: "flex", direction: "ltr", gap: "5px" }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <TextField
                key={index}
                variant="outlined"
                value={values[index]}
                inputRef={(el) => (inputsRef.current[index] = el)}
                onChange={handleInputChange(index)}
                onKeyDown={handleBackspace(index)}
                onPaste={handlePaste}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center", width: "40px" }, // Set the width of the input
                }}
                // Adjust TextField style here to make it smaller
                sx={{
                  width: 60, // Adjust the width of the outer TextField component
                  "& .MuiInputBase-input": {
                    height: "40px", // Adjust the height of the input
                    padding: "10px", // Adjust the padding to reduce size
                  },
                }}
              />
            ))}
          </div>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            {/* Your input fields here */}
            <Button
              onClick={verifyCode}
              variant="contained"
              color="info"
              sx={{ color: "white !important", mt: 4 }}
            >
              verifyButton111
            </Button>
          </Box>
        </Box>
      </Box>
      {/* <CustomizedSnackbars closeSnackbar={closeSnackbar} snackBar={snackBar} /> */}
    </>
  );
};

export default ForgetPassOTP;
