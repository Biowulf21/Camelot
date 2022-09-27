import { DocumentData } from 'firebase/firestore';
import React, {  useEffect, useState } from 'react'
import { Button, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { db } from '../../../../../services/firebase-config';
import LoadingComponent from '../../../../global-components/loading-component';
import './styles.css';
import SubscriberListHook from './subscriberListHooks';

interface subscriberListInterface{
  searchQuery: string;
}

const SubscriberListComponent = (props:subscriberListInterface) => {
  const { searchQuery } = props;
  const [isLoading, setisLoading] = useState(false);
  const [noMoreSubs, setnoMoreSubs] = useState(false);
  const [displaySubsList, setdisplaySubsList] = useState<DocumentData[]>([]);


  const {handleClaimPackage, handleLoadMoreSubs } = SubscriberListHook({searchQuery, setisLoading, displaySubsList, 
    setdisplaySubsList, setnoMoreSubs});

  

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
          displaySubsList.filter((subscriber)=>{

            if ( subscriber.LASTNAME.toLowerCase().includes(searchQuery.toLowerCase())
            || subscriber.FIRSTNAME.toLowerCase().includes(searchQuery.toLowerCase())
            || subscriber.IDNUMBER.toLowerCase().includes(searchQuery.toLowerCase())) {
              return subscriber;
            }
          }).map((subscriber) => {
            return (
            <ListGroupItem key={subscriber.IDNUMBER} className="subscriber-list-item">
                <Row>
                    <Col lg="1">
                        <span style={{backgroundColor: subscriber.HASCLAIMED === null ? "red" : "green"}} 
                        className="has-claimed-circle"></span>
                    </Col>
                    <Col>
                      <h5><strong>ID: {subscriber.IDNUMBER}</strong></h5>
                      <strong>Name: </strong> {subscriber.LASTNAME + ", " + subscriber.FIRSTNAME}
                    </Col>
                    <Col>
                      <h6><strong>Email:</strong> {subscriber.EMAIL}</h6>
                      <h6><strong>Batch Year:</strong> {subscriber.BATCHYEAR}</h6>
                    </Col>
                    <Col>
                      <h6><strong>Claimed Package:</strong> {subscriber.HASCLAIMED === null? 'No' : 'Yes'}</h6>
                      <h6><strong>Claim Date:</strong> {subscriber.CLAIMDATE === null ?
                       "Not Available" : subscriber.CLAIMDATE.toDate().toLocaleDateString()}</h6>
                    </Col>
                    <Col className="subscriber-list-item-button-div">
                      <Button className="sublist-btn" variant='success'>Edit</Button>
                      {subscriber.HASCLAIMED === null ? 
                      <Button onClick={()=>handleClaimPackage(subscriber.IDNUMBER, subscriber.LASTNAME, subscriber.FIRSTNAME)} 
                      className="sublist-btn" variant='danger'>Claim</Button> : null}
                    </Col>
                </Row>
            </ListGroupItem>);
          })
        ) : (
          <p style={{ textAlign: "center" }}>No subscribers to display</p>
        )}
      </ListGroup>
      {!noMoreSubs && displaySubsList.length > 1?
        <div className="load-more-div">
          <Button variant="secondary" onClick={handleLoadMoreSubs}>Load More...</Button>
        </div> : null 
      }
      </div>
    </>
  )
}

export default SubscriberListComponent