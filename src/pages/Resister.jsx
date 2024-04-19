import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Resister = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const isPasswordsValid = () => {
    if (
      formData.password.length < 8 ||
      !/\d/.test(formData.password) ||
      !/[a-zA-Z]/.test(formData.password) ||
      !/[A-Z]/.test(password)
    ) {
      return false;
    }
    return true;
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPasswordsValid) {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      } else {
        console.log("🚀 ~ handleSubmit ~ formData:", formData);
        const response = await axios.post(
          "http://localhost:3088/user/resister",
          formData
        );
        toast.success("Successfully");
        console.log(response.data);
        navigate("/login");
      }
    } else {
      toast.error(
        "Passwords must contain at least 8 characters and must contain"
      );
    }
  };
  return (
    <div id="main_resister" className="main_detail">
      <form onSubmit={handleSubmit} id="form_resister">
        <h3>Create an account</h3>
        <div>
          <p>Email Address</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Password</p>
          <p>
            Must be at least 8 characters long, include at least 1 letter and 1
            number.
          </p>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => handleChange(e, "password")}
          />
        </div>
        <div>
          <p>Confirm Password</p>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>User Name: </p>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>age: </p>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Mobile Phone (optional):</p>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create An Account</button>
        <span>
          Already have an account ? <NavLink to="/login">Sign In</NavLink>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Resister;
