'use client'

import { useState } from "react";

export default function Home() {
  const [otp,setOtp] = useState(0)
  useState(() => {},[])
  return (
    <>
<div>OTP : {otp}</div>
<input/>
<button onClick ={() => console.log('hi bro')} style={{width : "3rem"}}>hi</button>

    </>
  );
}
