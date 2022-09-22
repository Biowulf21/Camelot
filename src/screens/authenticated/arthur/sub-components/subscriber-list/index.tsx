import { DocumentData } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Subscribers } from '../../../../../services/Subscriber-Service/subscriber-service';
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
  
  return (
    <>
      <Container className="subscriber-list-container">
      <ListGroup>
        {displaySubsList.length > 0 ? (
          displaySubsList.map((subscriber) => {
            return <ListGroupItem>{subscriber.LASTNAME}</ListGroupItem>;
          })
        ) : (
          <p style={{ textAlign: "center" }}>No Headers to display</p>
        )}
      </ListGroup>
      </Container>
    </>
  )
}

export default SubscriberListComponent