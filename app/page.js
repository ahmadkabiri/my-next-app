'use client'
import { useEffect, useState } from 'react';

const Home = () => {
  const [otp, setOTP] = useState('');

  useEffect(() => {
    const fetchOTP = async () => {
      if ("OTPCredential" in window) {
        const ac = new AbortController();

        try {
          const otpCredential = await navigator.credentials.get({
            otp: { transport: ['sms'] },
            signal: ac.signal
          });
          setOTP(otpCredential.code);
          ac.abort();
        } catch (err) {
          ac.abort();
          console.error('Error fetching OTP:', err);
        }
      }
    };

    fetchOTP();

    return () => {
      // Cleanup function
      // Abort any ongoing fetch operation if component unmounts
      console.log('Component unmounted');
    };
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <div className="App">
      <h1>Hello Next.js</h1>
      <h2>Your OTP is: {otp}</h2>
    </div>
  );
};

export default Home;
