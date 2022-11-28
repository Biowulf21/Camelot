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
import MerlinPage from "./screens/authenticated/merlin/index";
import NewTemplate from "./screens/authenticated/merlin/sub-components/template/sub-components/new-template/index.tsx";
import MerlinMailing from "./screens/authenticated/merlin/sub-components/mailing/index";
import ArthurPage from "./screens/authenticated/arthur/index";
import ExcaliburPage from "./screens/authenticated/excalibur/index.tsx";

function App() {
  return (
    <React.StrictMode>
      <SideBar></SideBar>
      <Routes>
        {/* MERLIN */}
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route exact path="/merlin" element={<MerlinPage></MerlinPage>}></Route>
        <Route
          path="/merlin/new-template"
          element={<NewTemplate></NewTemplate>}
        ></Route>
        <Route
          path="/merlin/mailing"
          element={<MerlinMailing></MerlinMailing>}
        ></Route>
        {/* Arthur */}
        <Route path="/arthur" element={<ArthurPage></ArthurPage>}></Route>
        <Route path="*" element={<Error404Page></Error404Page>}></Route>
        {/* Excalibur */}
        <Route path="/excalibur" element={<ExcaliburPage />}></Route>
      </Routes>
    </React.StrictMode>
  );
}

export default App;
