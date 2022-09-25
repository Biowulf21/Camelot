import { collection, DocumentData, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Button, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { db } from '../../../../../services/firebase-config';
import LoadingComponent from '../../../../global-components/loading-component';
import './styles.css';

interface subscriberListInterface{
  searchQuery: string;
}

const SubscriberListComponent = (props:subscriberListInterface) => {
  const { searchQuery } = props;
  const [displaySubsList, setdisplaySubsList] = useState<DocumentData[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [lastDoc, setlastDoc] = useState<DocumentData>();
  const [noMoreSubs, setnoMoreSubs] = useState(false);
  const [searchResults, setsearchResults] = useState<DocumentData[]>();


  useEffect(() => {
    fetchSubscribers();
  }, []);

  useEffect(() => {
    console.log(searchQuery);
    firestoreSearch();
  }, [searchQuery]);

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  const firestoreSearch = async () => {
    if (props.searchQuery === "") return;

    const subSearchResults: DocumentData[] = [];

    const searchQuery = query(collection(db, 'Subscribers'), orderBy('FIRSTNAME'),
    where('FIRSTNAME', '==', props.searchQuery));
    
    // where('FIRSTNAME', '<=', props.searchQuery),
    // where('LASTNAME', '<=', props.searchQuery), 
    const results = await getDocs(searchQuery);
    results.forEach((result) => {
      subSearchResults.push({...result.data(), key: result.id})
    });

    setsearchResults(subSearchResults);
  }

 const fetchSubscribers = async () => {
  setisLoading(true);
  const subs = await getSubscribers();
  setdisplaySubsList(subs);
  setisLoading(false);
 }

 const handleLoadMoreSubs = async () =>{
  console.log('Displaying more subscribers');
  setisLoading(true);
  const moreSubs = await getMoreSubscribers();
  if (moreSubs === undefined){
    setisLoading(false);
    return;
  }
  setdisplaySubsList((newSubsList) => [...newSubsList, ...moreSubs]);
  setisLoading(false);
 }

 const getSubscribers = async () =>{
  const subscribers:DocumentData[] = []
        const q = query(collection(db, 'Subscribers'), orderBy('LASTNAME'), limit(100));
        const querySnapshot = await getDocs(q);
        const lastSubDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        setlastDoc(lastSubDoc);
        querySnapshot.forEach((doc)=>{
            subscribers.push({...doc.data(), key: doc.id})
        })
            return subscribers;

 }

 const getMoreSubscribers = async () =>{
      const moreSubscribers: DocumentData[] = []
            
      const moreSubsQuery = query(collection(db, 'Subscribers'),
      orderBy('LASTNAME'), startAfter(lastDoc), limit(100));

      const moreSubsList = await getDocs(moreSubsQuery);
      const lastSubDoc = moreSubsList.docs[moreSubsList.docs.length - 1];
      setlastDoc(lastSubDoc);
      if (moreSubsList.size === 0) {
        setnoMoreSubs(true);
        console.log("No more documents to fetch.")
        return;
      }
      moreSubsList.forEach((doc)=>{
          moreSubscribers.push({...doc.data(), key: doc.id})
      })
      
      return moreSubscribers;
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
        {displaySubsList.length > 0 && searchQuery !== "" ? (
          displaySubsList.filter((subscriber)=>{

            if (searchQuery=="") return subscriber;

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
                      <h6><strong>Claim Date:</strong> {subscriber.CLAIMDATE === null ? "Not Available" : "Yes"}</h6>
                    </Col>
                    <Col className="subscriber-list-item-button-div">
                      <Button className="sublist-btn" variant='success'>Edit</Button>
                      {subscriber.HASCLAIMED === null ? 
                      <Button className="sublist-btn" variant='danger'>Claim</Button> : null}
                    </Col>
                </Row>
            </ListGroupItem>);
          })
        ) : (
          <p style={{ textAlign: "center" }}>No subscribers to display</p>
        )}
      </ListGroup>
      {!noMoreSubs ?
        <div className="load-more-div">
          <Button variant="secondary" onClick={handleLoadMoreSubs}>Load More...</Button>
        </div> : <h2 className="load-more-text">No More Subscribers to Show</h2>
      }
      </div>
    </>
  )
}

export default SubscriberListComponent