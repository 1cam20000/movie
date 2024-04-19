import React, { createContext, useContext, useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Drawer, Input } from "antd";
import axios from "axios";
export const SortByYear = createContext(null);
const Drawerr = ({ fnt, handleKeyPress, handleSubmit, searchTerm }) => {
  //
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const navSignIn = () => {
    navigate("/login");
  };
  //
  const [user, setUser] = useState({});
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const token = localStorage.getItem("token");
  const callAPI = async () => {
    const response = await axios.get(
      "http://localhost:3088/user/detail-profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUser(response.data);
  };
  useEffect(() => {
    callAPI();
  }, []);
  //
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };
  return (
    <>
      <div id="header">
        <Button onClick={showDrawer} style={{ border: "none" }}>
          <IoMenu size={40} style={{ color: "hsl(240deg 1.47% 73.33%)" }} />
        </Button>
        <Drawer onClose={onClose} open={open}>
          {isLoggedIn ? (
            <NavLink to="/profile" id="profile">
              {user.name}'Account
            </NavLink>
          ) : (
            <Button onClick={navSignIn}>Sign in</Button>
          )}
          <Button onClick={fnt}>Filter By Year</Button>
          <br />
          {isLoggedIn && <Button onClick={handleLogOut}>Log Out</Button>}
        </Drawer>
      </div>
    </>
  );
};

export { Drawerr };
