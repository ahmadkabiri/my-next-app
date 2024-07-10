'use client'

import { useState } from "react";

export default function Home() {
  const [otp,setOtp] = useState(0)
  useState(() => {
    if ("OTPCredential" in window) {
      const ac = new AbortController();
    
      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal
        })
        .then((otp) => {
          setOtp(otp.code);
          ac.abort();
        })
        .catch((err) => {
          ac.abort();
          console.log(err);
        });
    }
  },[])


  return (
    <>
<div>OTP : {otp}</div>
<input/>
<button onClick ={() => console.log('hi bro')} style={{width : "3rem"}}>hi</button>

    </>
  );
}
