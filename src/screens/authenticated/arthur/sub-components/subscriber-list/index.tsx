import { DocumentData, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Modal,
  Row,
} from "react-bootstrap";
import Swal from "sweetalert2";
import LoadingComponent from "../../../../global-components/loading-component";
import "./styles.css";
import EditModal from "./sub-components/edit-modal";
import SubscriberListHook from "./subscriberListHooks";

interface subscriberListInterface {
  searchQuery: string;
}

interface SubscriberInterface {
  IDNUMBER: string | null;
  FIRSTNAME: string | null;
  LASTNAME: string | null;
  EMAIL: string | null;
  COURSE: string | null;
  BATCHYEAR: string | null;
  PACKAGE_TYPE: string | null;
  HASCLAIMED_PP: boolean | null;
  PP_CLAIM_DATE: Timestamp | null;
  HASCLAIMED_YB: boolean | null;
  YB_CLAIM_DATE: Timestamp | null;
}

const SubscriberListComponent = (props: subscriberListInterface) => {
  const { searchQuery } = props;
  const [isLoading, setisLoading] = useState(false);
  const [noMoreSubs, setnoMoreSubs] = useState(false);
  const [displaySubsList, setdisplaySubsList] = useState<DocumentData[]>([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    handleClaimPackage,
    handleLoadMoreSubs,
    handleEditSubscriber,
    handleDeleteSubscriber,
  } = SubscriberListHook({
    searchQuery,
    setisLoading,
    displaySubsList,
    setdisplaySubsList,
    setnoMoreSubs,
  });

  if (isLoading === true) {
    return (
      <>
        <div
          className="subscriber-list-container"
          style={{ display: "flex", alignItems: "center" }}
        >
          <LoadingComponent></LoadingComponent>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="subscriber-list-container">
        <EditModal
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
        />
        <ListGroup>
          {displaySubsList.length > 0 ? (
            displaySubsList
              .filter((subscriber) => {
                if (
                  subscriber.IDNUMBER.toLowerCase().includes(
                    searchQuery.toLowerCase()
                  )
                ) {
                  return subscriber;
                }
              })
              .map((subscriber) => {
                return (
                  <ListGroupItem
                    key={subscriber.IDNUMBER}
                    className="subscriber-list-item"
                  >
                    <Row>
                      <Col lg="1">
                        <span
                          style={{
                            backgroundColor:
                              subscriber.HASCLAIMED === null ? "red" : "green",
                          }}
                          className="has-claimed-circle"
                        ></span>
                      </Col>
                      <Col>
                        <h5>
                          <strong>ID: {subscriber.IDNUMBER}</strong>
                        </h5>
                        <strong>Name: </strong>{" "}
                        {subscriber.LASTNAME + ", " + subscriber.FIRSTNAME}
                      </Col>
                      <Col>
                        <h6>
                          <strong>Email:</strong> {subscriber.EMAIL}
                        </h6>
                        <h6>
                          <strong>Batch Year:</strong> {subscriber.BATCHYEAR}
                        </h6>
                      </Col>
                      <Col>
                        <h6>
                          <strong>Claimed Package:</strong>{" "}
                          {subscriber.HASCLAIMED_YB === null ? "No" : "Yes"}
                        </h6>
                        <h6>
                          <strong>YB Claim Date:</strong>{" "}
                          {subscriber.YB_CLAIM_DATE === null
                            ? "Not Available"
                            : subscriber.CLAIMDATE.toDate().toLocaleDateString()}
                        </h6>
                      </Col>
                      <Col className="subscriber-list-item-button-div">
                        <Button className="sublist-btn" variant="success">
                          Edit
                        </Button>
                        {subscriber.HASCLAIMED_YB === null ? (
                          <Button
                            onClick={() =>
                              handleClaimPackage(
                                subscriber.IDNUMBER,
                                subscriber.LASTNAME,
                                subscriber.FIRSTNAME
                              )
                            }
                            className="sublist-btn"
                            variant="danger"
                          >
                            Claim
                          </Button>
                        ) : null}
                      </Col>
                    </Row>
                  </ListGroupItem>
                );
              })
          ) : (
            <p style={{ textAlign: "center" }}>No subscribers to display</p>
          )}
        </ListGroup>
        {!noMoreSubs && displaySubsList.length > 1 ? (
          <div className="load-more-div">
            <Button variant="secondary" onClick={handleLoadMoreSubs}>
              Load More...
            </Button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SubscriberListComponent;
