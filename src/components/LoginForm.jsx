import { Button } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const LoginForm = () => {
  const [isExistingCustomer, setIsExistingCustomer] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (event) => {
    setIsExistingCustomer(event.target.value === "yes");
  };
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const response = await axios.post(
      "http://localhost:3088/user/login",
      formData
    );
    console.log("🚀 ~ handleSubmit ~ response:", response);
    console.log("🚀 ~ handleSubmit ~ create token:", response.data);
    localStorage.setItem("token", response.data);
    if (response.data.message) {
      toast.error(response.data.message);
    } else {
      toast.success("Login successfully");
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    }
  };
  return (
    <div id="loginForm" className="main_detail">
      <div id="form_login">
        <h1>Sign In</h1>
        <h4>What is your email address?</h4>
        <div id="inputEmail">
          <span>My email address is: </span>
          <input
            id="input_email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <h4>Do you have a MovieUI password?</h4>
        <div>
          <div id="login_radio">
            <div>
              <label>
                <input
                  type="radio"
                  value="no"
                  checked={!isExistingCustomer}
                  onChange={handleOptionChange}
                />
                No, I am a new customer.
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="yes"
                  checked={isExistingCustomer}
                  onChange={handleOptionChange}
                />
                Yes, I have a password.
              </label>
            </div>
          </div>
          {isExistingCustomer && (
            <div>
              <input
                id="input_password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button id="btn_signIn" onClick={handleSubmit}>
                SIGN IN USING OUR SECURE SERVER
              </button>
            </div>
          )}
          {!isExistingCustomer && (
            <NavLink to="/resister">
              <div>
                <button id="btn_signUp" onClick={handleSubmit}>
                  Sign up
                </button>
              </div>
            </NavLink>
          )}
        </div>
        <NavLink>Forgot your password?</NavLink>
        <p id="or">or</p>
        <div>
          <NavLink>
            <Button className="signWith">Sign in with Facebook</Button>
          </NavLink>
        </div>
        <div>
          <NavLink>
            <Button className="signWith">Sign in with Google</Button>
          </NavLink>
        </div>
        <div>
          <NavLink>
            <Button className="signWith">Sign in with Apple</Button>
          </NavLink>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export { LoginForm };
