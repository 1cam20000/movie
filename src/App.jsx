import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Login from "./pages/Login";
import Resister from "./pages/Resister";
import Profile from "./pages/Profile";
//
export const AppContext = createContext(null);
//
function App() {
  const [data, setData] = useState([]);
  const callApi = async () => {
    const response = await axios.get("http://localhost:3088/phim/tat-ca-phim");
    console.log("🚀 ~ callApi ~ response:", response.data);
    setData(response.data);
  };
  useEffect(() => {
    callApi();
  }, []);

  return (
    <AppContext.Provider value={{ data: data }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resister" element={<Resister />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
