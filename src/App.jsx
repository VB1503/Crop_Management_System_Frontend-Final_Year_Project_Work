import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import {ToastContainer} from 'react-toastify'
import Header from './components/nav/Header';
import SocialAuth from './pages/social-auth/SocialAuth'
import "./App.css"
import "./login.css"
import "./Register.css"
import 'react-toastify/dist/ReactToastify.css';
import "./otp.css"
import VerifyOtp from './pages/auth/VerifyOtp';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgetPassword from './pages/auth/ForgetPassword';
import ResetPassword from './pages/auth/ResetPassword';
import ProfileUpdate from './components/user/UpdateProfile';

import MapComponent from './components/Map/MapDrawer';
import CropRecommendationForm from "./pages/CropRecommendation"
import CropYieldPredictionForm from './pages/CropYield';
import IrrigationSystem from './pages/Irrigation';
import FertilizerRecommendationForm from './pages/fertilizers';
import FertilizerRecommendationResult from './pages/FertilizerRes';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="/google" element={<SocialAuth />} />
      <Route path="/otp/verify" element={<VerifyOtp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/LSM" element={<MapComponent />} />
      <Route path="/crs" element={<CropRecommendationForm />} />
      <Route path="/irrigation" element={<IrrigationSystem />} />
      <Route path="/fertilizer" element={<FertilizerRecommendationForm />} />
      <Route path="/fertilizerres" element={<FertilizerRecommendationResult />} />
      <Route path="/cys" element={<CropYieldPredictionForm />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile_update" element={<ProfileUpdate />} />
      <Route path='/forget_password' element={<ForgetPassword />} />
      <Route path='/password-reset-confirm/:uid/:token' element={<ResetPassword />} />
    </Route>
  )
)

function App() {

  return (
    <>
    <ToastContainer />
      <RouterProvider router={router}/>

    </>
  );
}

export default App;