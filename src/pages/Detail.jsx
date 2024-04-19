import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { useParams, useNavigate } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from "antd";
import { CiPlay1 } from "react-icons/ci";

const Detail = () => {
  const [newData, setNewData] = useState({});
  const { data } = useContext(AppContext);
  const { id } = useParams();
  useEffect(() => {
    const localState = data.find((item) => item.ID.toString() === id);
    setNewData(localState);
  });
  //
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/");
  };
  return (
    <div className="main_detail">
      <div className="box_left">
        <div className="img_detail">
          <img src={newData.image} alt={newData.name} />
        </div>
      </div>
      <div className="box_right">
        <MdOutlineCancel id="cancel" size={30} onClick={handleCancel} />
        <h2>{newData.name}</h2>
        <p>
          {newData.time} min {newData.year}
        </p>
        <br />
        <br />
        <p>{newData.introduce}</p>
        <br />
        <Button id="play_movie">
          <CiPlay1 size={30} />
          <span style={{ fontSize: "30px" }}>PLAY MOVIE</span>
        </Button>
      </div>
    </div>
  );
};

export default Detail;
