import { DocumentData } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Subscribers } from '../../../../../services/Subscriber-Service/subscriber-service';
import LoadingComponent from '../../../../global-components/loading-component';
import './styles.css';

const SubscriberListComponent = () => {
  const [displaySubsList, setdisplaySubsList] = useState<DocumentData[]>([]);
  const [isLoading, setisLoading] = useState(false);
  var SubsObj = new Subscribers();

  useEffect(() => {
    fetchSubscribers();
  }, []);


 const fetchSubscribers = async () => {
  setisLoading(true);
  const subs = await SubsObj.getSubscribers();
  setdisplaySubsList(subs);
  setisLoading(false);
 }

 if (isLoading === true) {
  return(
    <>
      <div className="subscriber-list-container" style={{display: 'flex', alignItems: 'center'}}>
        <LoadingComponent></LoadingComponent>
      </div>
    </>
  );
 }
  
  return (
    <>
      <div className="subscriber-list-container">
      <ListGroup>
        {displaySubsList.length > 0 ? (
          displaySubsList.map((subscriber) => {
            return (
            <ListGroupItem key={subscriber.IDNUMBER} className="subscriber-list-item">
                <Row>
                    <Col lg="1">
                        <span style={{backgroundColor: subscriber.HASCLAIMED === "YES" ? "green" : "red"}} 
                        className="has-claimed-circle"></span>
                    </Col>
                    <Col>
                      <h5><strong>ID: {subscriber.IDNUMBER}</strong></h5>
                      <strong>Name: </strong> {subscriber.LASTNAME + ", " + subscriber.FIRSTNAME}
                    </Col>
                    <Col>
                      <h6><strong>Email:</strong> {subscriber.EMAIL}</h6>
                      <h6><strong>College:</strong> {subscriber.COLLEGE}</h6>
                    </Col>
                    <Col>
                      <h6><strong>Claimed Package:</strong> {subscriber.HASCLAIMED == "YES"? 'Yes' : "No"}</h6>
                      <h6><strong>Claim Date:</strong> {subscriber.CLAIMDATE === "" ? "Not Available" : "Yes"}</h6>
                    </Col>
                    <Col className="subscriber-list-item-button-div">
                      <Button className="sublist-btn" variant='success'>Edit</Button>
                      {subscriber.HASCLAIMED === "" ? 
                      <Button className="sublist-btn" variant='danger'>Claim</Button> : null}
                    </Col>
                </Row>
            </ListGroupItem>);
          })
        ) : (
          <p style={{ textAlign: "center" }}>No subscribers to display</p>
        )}
      </ListGroup>
      </div>
    </>
  )
}

export default SubscriberListComponent