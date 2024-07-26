import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [isInvalid, setIsInvalid] = useState(false); // State to manage input validation
  const [isIncorrect, setIsIncorrect] = useState(false); // State to manage input validation
  const navigate = useNavigate();
  const userId = localStorage.getItem('userid');
  const [resend, setResend] = useState(false);
  const phone_number = localStorage.getItem('phone_number');
  const username = localStorage.getItem('first_name');
  const [phonenumber, setPhone] = useState(localStorage.getItem('phone_number'));

  useEffect(() => {
    // Logic to format the phone number
    if (phonenumber && phonenumber.length >= 10) {
      const formattedPhoneNumber = phonenumber.slice(0, 2) + '****' + phonenumber.slice(-4);
      setPhone(formattedPhoneNumber);
    }
  }, [phonenumber]);
  const handleOtpResend = async (e) => {
    e.preventDefault();
    setResend(true);
    if(phone_number){
        const res = await axios.post('https://agroharvest.onrender.com/api/v1/auth/resendOtp/', { 'user': parseInt(userId, 10), 'phone_number': phone_number });
        const resp = res.data;
    }
}
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      const userInt = parseInt(userId, 10);
      try {
        const res = await axios.post('https://agroharvest.onrender.com/api/v1/auth/verify-phone/', { 'user': userInt, 'otp': otp });
        const resp = res.data;
        if (res.status === 200) {
          localStorage.setItem('is_verified', true)
          navigate('/login');
          toast.success(resp.message);
        }
      } catch (error) {
        setIsIncorrect(true);
        console.error('Error verifying OTP:', error);
        toast.error('An error occurred while verifying OTP');
      }
    } else {
      setIsInvalid(true); // Set invalid state to true if OTP is invalid
      toast.error('OTP should be 6 digits long and consist only of numbers');
    }
  };

  return (
    <div className='otp-cont'>
      <div className='otp-card'>
        <div className='otp-welcome'>
          <p className='otp-user'>Hi, {username}</p>
          <p className={resend ? 'resend': 'otp-info'}>We sent you a OTP to this number {phonenumber}</p>
        </div>
        <form action='' onSubmit={handleOtpSubmit}>
          <div className='otp-form'>
            <label htmlFor=''>Enter your OTP:</label>
            <input
              type='text'
              className={`otpfill ${isInvalid && 'invalid-otp'}`} // Conditionally apply 'invalid' class
              name='otp'
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setIsInvalid(false);
                setIsIncorrect(false);
              }}
            />
            {isInvalid && <p className='error'>OTP should be 6 digits long and consist only of numbers</p>}
            {isIncorrect && <p className='error'>OTP is wrong ! Please check again.</p>}
            <p className='pass-link' onClick={handleOtpResend}>
              Resend OTP?
            </p>
          </div>
          <input type='submit' value='Send' className='submitButton' />
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
