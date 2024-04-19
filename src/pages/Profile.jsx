import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Profile = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    password: "",
    address: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);

  const callAPI = async () => {
    const response = await axios.get(
      "http://localhost:3088/user/detail-profile",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("🚀 ~ callAPI ~ response:", response.data);
    setUser(response.data);
  };
  useEffect(() => {
    callAPI();
  }, []);

  const handleEdit = () => {
    setEdit(!edit);
  };
  const handleSubmit = async () => {
    const response = await axios.put(
      "http://localhost:3088/user/edit-profile",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
      //   user.ID,
      formData
    );
    console.log("🚀 ~ handleSubmit ~ response:", response);
    console.log("🚀 ~ handleSubmit ~ create token:", response.data);
    if (response.data.message) {
      toast.error(response.data.message);
    } else {
      toast.success("Update successfully");
      setEdit(!edit);
    }
  };
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };
  return (
    <div id="main_content_profile" className="main_detail">
      <div className="profile">
        <h1>{user.name}'s Account</h1>
        <div className="buttonProfile">
          <Button onClick={handleEdit}>edit</Button>
          <Button onClick={handleLogOut}>logout</Button>
        </div>
        {edit && (
          <div>
            <div className="show_profile">
              <p>password</p>
              <p>
                Must be at least 8 characters long, include at least 1 letter
                and 1 number.
              </p>
              <input
                type="password"
                name="password"
                value={formData.password || ""}
                onChange={(e) => handleChange(e, "password")}
              />
            </div>
            <div className="show_profile">
              <p>User Name: </p>
              <input
                placeholder={user.name}
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
              />
            </div>
            <div className="show_profile">
              <p>age: </p>
              <input
                placeholder={user.age}
                type="number"
                name="age"
                value={formData.age || ""}
                onChange={handleChange}
              />
            </div>

            <div className="show_profile">
              <p>Mobile Phone (optional):</p>
              <input
                placeholder={user.phone}
                type="tel"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
              />
            </div>

            <button type="submit" onClick={handleSubmit}>
              Apply
            </button>
          </div>
        )}
        {!edit && (
          <div className="show_profile">
            <p>email: {user.email}</p>
            <p>username: {user.name}</p>
            <p>phone: {user.phone}</p>
            <p>age: {user.age}</p>
            <NavLink id="continue_shopping" to="/">
              Continue Watching
            </NavLink>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
