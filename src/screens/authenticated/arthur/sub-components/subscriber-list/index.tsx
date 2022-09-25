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
  const [searchResults, setsearchResults] = useState<DocumentData[]>([]);
  const [tempSubsList, settempSubsList] = useState<DocumentData[]>([]);
  const [initialSubsList, setinitialSubsList] = useState<DocumentData[]>([]);


  useEffect(() => {
    fetchSubscribers();
  }, []);

  useEffect(() => {
    // Searching Logic: Since initial search is  only 20 docs long, if user searches for a subscriber,
    // firestoreSearch is ran, which will query Firestore for the search term (ID Number only). 
    // Once done, current list of subscribers (displaySubsList)
    // will be updated to include the document results for the search term.
    
    const localSearch = displaySubsList.find(subscriber => subscriber.ID === props.searchQuery);
    if (searchQuery === ""){
      if (localSearch != undefined){
        setdisplaySubsList((oldValue) => [...tempSubsList, ...oldValue]);
      } else{
        setdisplaySubsList((oldValue) => [...tempSubsList]);
        return;
      }
    }
    console.log(searchQuery);
    firestoreSearch();
  }, [searchQuery]);

  useEffect(() => {
    console.log('search: ');
    console.log(searchResults);
  }, [searchResults]);

  useEffect(() => {
    console.log('subsList: ')
    console.log(displaySubsList);
  },[displaySubsList])

  const firestoreSearch = async () => {
    if (props.searchQuery === "") return;

    const localSearch = displaySubsList.find(subscriber => subscriber.ID === props.searchQuery);

    const subSearchResults: DocumentData[] = [];
    const searchQueryID = query(collection(db, 'Subscribers'), orderBy('FIRSTNAME'),
    where('IDNUMBER', '==', props.searchQuery));
    
    const resultsID = await getDocs(searchQueryID)

    resultsID.forEach((result) => {
      subSearchResults.push({...result.data(), key: result.id})
    });

    settempSubsList(displaySubsList);
    setsearchResults(subSearchResults);
    // If we can find the object inside our local copy of data, then there is no need to add it again
    // to avoid duplicates.
    if (localSearch != undefined){
      return;
    } else{
      if (subSearchResults.length === 0 ){
        setdisplaySubsList([...initialSubsList]);
      } else{
        setdisplaySubsList([...subSearchResults]);
      }
    }
  }

 const fetchSubscribers = async () => {
  setisLoading(true);
  const subs = await getSubscribers();
  setdisplaySubsList(subs);
  setinitialSubsList(subs);
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
        const q = query(collection(db, 'Subscribers'), orderBy('LASTNAME'), limit(10));
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
      orderBy('LASTNAME'), startAfter(lastDoc), limit(10));

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
                      <h6><strong>Claim Date:</strong> {subscriber.CLAIMDATE === null ? "Not Available" : subscriber.CLAIMDATE}</h6>
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