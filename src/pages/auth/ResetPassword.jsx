import React, {useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const ResetPassword = () => {
  const navigate=useNavigate()
  const {uid, token}=useParams()
  const [username, setUsername] = useState(localStorage.getItem('first_name'))
  const [profile, setProfile] = useState(localStorage.getItem('profile_pic'))
  const [email, setEmail] = useState(localStorage.getItem('email'))
  const [newpasswords, setNewPassword]=useState({
    password:"",
    confirm_password:"",
  })
  const [errors, setErrors] = useState({
    password: "",
    confirm_password: ""
  });
  const {password, confirm_password}=newpasswords
  const handleLogout = () => {
    localStorage.clear();
    setUsername("")
    setProfile("")
    setEmail("")
  };
  const handleChange=(e)=>{
    const { name, value } = e.target;
    setNewPassword({ ...newpasswords, [name]: value });
    if (name === 'password') {
        const isValid = value.length >= 6;
        setErrors({ ...errors, password: isValid ? '' : 'Password must be at least 6 characters long' });
      }
  
      // Confirm password
      if (name === 'confirm_password') {
        const isValid = value === newpasswords.password;
        setErrors({ ...errors, confirm_password: isValid ? '' : 'Passwords do not match' });
      }
}

const data={
  "password":password,
  "confirm_password":confirm_password,
  "uidb64":uid,
  "token": token,
}
 const handleSubmit =async (e)=>{
    e.preventDefault()
    if (data) {
      const res = await axios.patch('https://agroharvest.onrender.com/api/v1/auth/set-new-password/', data)
      const response = res.data
      
      if (res.status === 200) {
        alert(response.message);
           handleLogout();
           navigate('/login')
           window.location.href = '/login';
           window.location.reload(true);
           
      }
      console.log(response)
      
    }
    
 }
  return (
    <div>
        <div className='otp-cont'>
        <div className='otp-card'>
          <h2 className='otp-user'>Reset your Password</h2> 
            <form action="" onSubmit={handleSubmit}>
            <div className='otp-form'>
                 <label htmlFor="">Set New Password:</label>
                 <input type="text"
                   className={`otpfill ${errors.password && 'invalid-otp'}`} 
                   name="password"
                   value={password}
                   onChange={handleChange}     
                   />  
                   {errors.password && <span className="error">{errors.password}</span>}  
               </div>
               <div className='otp-form'>
                 <label htmlFor="">Confirm Password</label>
                 <input type="text"
                   className={`otpfill ${errors.confirm_password && 'invalid-otp'}`}
                   name="confirm_password"
                   value={confirm_password}
                   onChange={handleChange}              
                   />    
                   {errors.confirm_password && <span className="error">{errors.confirm_password}</span>}
               </div>
               <button type='submit' className='submitButton'>Submit</button>
            </form>
        </div>
        </div>
    </div>
  )
}

export default ResetPassword