import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/guest/login/index";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
