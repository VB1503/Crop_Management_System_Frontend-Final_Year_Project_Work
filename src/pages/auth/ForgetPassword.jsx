import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaExclamationCircle } from "react-icons/fa";
import axios from 'axios';

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isValidEmail) {
        toast.error('Please enter a valid email address');
        return;
      }
      try {
        const res = await axios.post('https://agroharvest.onrender.com/api/v1/auth/password-reset/', { email });
        if (res.status === 200) {
          console.log(res.data);
          navigate("/");
          toast.success('A link to reset your password has been sent to your email');
        }
        setEmail("");
      } catch (error) {
        console.error('An error occurred:', error);
        toast.error('This Email is not Registered, Please Register your Account');
      }
    }
  };

  return (
    <div className='otp-cont'>
      <div className='otp-card'>
        <div className='forgetIcon'>
          <FaExclamationCircle className='fa-exclamation' />
          <h1><b>Forgot Password</b></h1>
          <h3>Enter your Email and we will send you a link to reset your Password</h3>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className='otp-form'>
            <input
              type="text"
              className='otpfill'
              name="email"
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className='submitButton'>Send</button>
        </form>
        <div className='singup-msg'>
          <p> <Link to="/login">&#x2190; Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
