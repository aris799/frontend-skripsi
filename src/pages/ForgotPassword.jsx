import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  // State untuk toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    // Validasi Input
    if (!email || !newPassword || !confirmPassword) {
      toast.error("Harap isi semua field");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Password tidak cocok");
      return;
    }

    try {
      // Logika pemilihan URL berdasarkan environment
      const baseURL = window.location.hostname === 'localhost' 
        ? 'http://localhost:3000'  // URL lokal
        : import.meta.env.VITE_BACKEND_JS_URL;  // URL production dari environment

      console.log('Base URL yang digunakan:', baseURL);

      const response = await axios.post(
        `${baseURL}/api/v1/forgot-password`, 
        { 
          email,   
          newPassword 
        }
      );

      // Tampilkan pesan sukses
      toast.success(response.data.msg || "Reset password berhasil");
      
      // Redirect ke halaman login
      navigate("/login");
    } catch (err) {
      // Error handling yang lebih detail
      console.error('Error reset password:', err);

      const errorMsg = err.response?.data?.msg || 
                       err.response?.data?.message || 
                       'Terjadi kesalahan saat reset password';
      
      toast.error(errorMsg);
    }
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <img 
          src="https://res.cloudinary.com/diogvlobw/image/upload/v1762062126/Logo_SRSIK_Vertical_da5k1s.png" 
          alt="Logo SRSIK" 
          className="login-image"
        />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-center">
            <h2>Reset Password</h2>
            <p>Enter your email and new password</p>
            <form onSubmit={handleForgotPasswordSubmit}>
              <input 
                type="email" 
                placeholder="Email" 
                name="email" 
                required 
              />
              
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  name="newPassword"
                  required
                  minLength="6"
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FaEye
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>

              <div className="pass-input-div">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  required
                  minLength="6"
                />
                {showConfirmPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                ) : (
                  <FaEye
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                )}
              </div>

              <div className="login-center-buttons">
                <button type="submit">Reset Password</button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Remember your password? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
