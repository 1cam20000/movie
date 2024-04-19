import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { NavLink } from "react-router-dom";
import { Drawerr } from "../components/Drawer";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import { Button, Input } from "antd";

const Home = () => {
  const { data } = useContext(AppContext);
  const [sortData, setSortData] = useState(() => {
    const storedData = localStorage.getItem("initialData");
    return storedData ? JSON.parse(storedData) : data;
  });

  useEffect(() => {
    localStorage.setItem("initialData", JSON.stringify(data));
  }, [data]);

  //
  const handleFilter = async () => {
    const response = await axios.get("http://localhost:3088/phim/sorted");
    // console.log("🚀 ~ handleFilter ~ response:", response.data);
    setSortData(response.data);
  };

  //
  const [keyword, setKeyword] = useState("");
  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  //
  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3088/phim/search", {
        keyword,
      });
      // setSearchResults(response.data);
      setSortData(response.data);
      console.log("🚀 ~ handleSearch ~ response.data:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //
  const [showInput, setShowInput] = useState(false);
  const toggleInput = () => {
    setShowInput(!showInput);
  };
  return (
    <>
      <div className="main_content">
        <div className="header">
          <Drawerr fnt={handleFilter} />
          <div id="movie">
            <span>Movie</span>
            <span id="ui">UI</span>
          </div>
          <div className="search">
            <div onClick={toggleInput}>
              <IoSearch size={40} />
            </div>
            {showInput && (
              <div className="input-container">
                <Input
                  type="text"
                  name="keyword"
                  placeholder="Nhap ten phim..."
                  value={keyword}
                  onChange={handleChange}
                />
                <button id="btn_search" onClick={handleSearch}>
                  Search
                </button>
              </div>
            )}
          </div>
        </div>
        <div id="main_body">
          <p>Most Populate Movies</p>
          <div id="list_item">
            {sortData.map((item) => {
              return (
                <NavLink to={`/${item.ID}`} key={item.ID}>
                  <div key={item.ID} id="item">
                    <div className="img">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <h4>{item.name}</h4>
                    <p id="time_year">
                      {item.time} min {item.year}
                    </p>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
