import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { toast } from 'react-toastify';
import "./index.css";

const  BACKEND_API_URL = "https://agroharvest.onrender.com"

const SocialAuth = () => {
  let location = useLocation();
  console.log("location", location);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const values = queryString.parse(location.search);
    const code = values.code ? values.code : null;

    if (code) {
      onGogglelogin();
    }
  }, []);

  const googleLoginHandler = (code) => {
    return axios
      .get(`${BACKEND_API_URL}/api/auth/google/${code}`)
      .then((res) => {
        console.log("res", res)
        localStorage.setItem('token', JSON.stringify(res.data.access_token));
        localStorage.setItem('refresh_token', JSON.stringify(res.data.refresh_token));
        localStorage.setItem("first_name", res.data.user.first_name);
        localStorage.setItem("last_name", res.data.user.last_name);
        localStorage.setItem("userid", res.data.user.id);
        localStorage.setItem("phone_number", res.data.user.phone_number);
        localStorage.setItem('is_verified',res.data.user.is_verified);
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("profile_pic", res.data.user.profile_pic);
        navigate('/')
        window.location.href = '/';
        window.location.reload(true);
        return res.data;
      })
      .catch((err) => {
        console.log("error", err)
        setError(err.message || "Something went wrong!");
        toast.error(err.message || "Something went wrong!");
        navigate('/login')
        return err;
      });
  };

  const onGogglelogin = async () => {
    const response = await googleLoginHandler(location.search);
    console.log(response);
  }

  return (
    <div className="loading-icon-container">
      <div className="loading-icon">
        <div className="loading-icon__circle loading-icon__circle--first"></div>
        <div className="loading-icon__circle loading-icon__circle--second"></div>
        <div className="loading-icon__circle loading-icon__circle--third"></div>
        <div className="loading-icon__circle loading-icon__circle--fourth"></div>
      </div>
        <small className=" text-center mr-2">
          Just a moment
        </small>
    </div>
  );
};


export default SocialAuth;
