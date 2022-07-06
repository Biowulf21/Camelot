import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Switch,
  useLocation,
} from "react-router-dom";
import Login from "./screens/guest/login/index";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./screens/authenticated/dashboard/index";
import Error404Page from "./screens/404";
import SideBar from "./screens/authenticated/dashboard/sub-components/navbar";
import React from "react";

function App() {
  return (
    <React.StrictMode>
      <SideBar></SideBar>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="*" element={<Error404Page></Error404Page>}></Route>
      </Routes>
    </React.StrictMode>
  );
}

export default App;
