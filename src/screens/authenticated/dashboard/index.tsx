import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { getAuth, signOut } from "firebase/auth";
// import getCountFromServer from "firebase";
import { useNavigate } from "react-router-dom";
import SideBar from "../dashboard/sub-components/navbar/index";
import {
  collection,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../../services/firebase-config";
import GraphComponent from "./sub-components/graphComponent";

const Dashboard = () => {
  const navigate = useNavigate();
  const [subscriberCount, setSubscriberCount] = useState<number>(0);

  useEffect(() => {
    const token = sessionStorage.getItem("Auth_Token");
    if (!token) {
      navigate("/");
    }
  }, []);

  //! TODO:  Add logic that would call the firestore count function
  // useEffect(() => {
  //   async function getSubscriberCount() {
  //     const coll = collection(db, "cities");
  //     const snapshot = await getCountFromServer(coll);
  //   }
  // });

  return (
    <Container className="pt-5">
      <Row>
        <Col>
          <Card className="d-flex w-100 m-2 p-5 align-items-center">
            Total Subscribers Uploaded
            <div className="d-flex ">
              <strong>Feature Coming Soon</strong>
            </div>
            <div>
              <GraphComponent />
            </div>
          </Card>
        </Col>
        <Col>
          <Card className="d-flex w-100 m-2 p-5 align-items-center">
            Subscribers with Claimed Yearbooks
            <div className="d-flex ">
              <strong>Feature Coming Soon</strong>
            </div>
            <div>
              <GraphComponent />
            </div>
          </Card>
        </Col>
        <Col>
          <Card className="d-flex w-100 m-2 p-5 align-items-center">
            Subscribers with Claimed Photo Packages
            <div className="d-flex ">
              <strong>Feature Coming Soon</strong>
            </div>
            <div>
              <GraphComponent />
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
