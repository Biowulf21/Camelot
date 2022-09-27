import { collection, doc, DocumentData, getDocs, limit, orderBy, query, serverTimestamp, setDoc, startAfter, where } from 'firebase/firestore'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Button, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
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
  const [searchResultsList, setsearchResultsList] = useState<DocumentData[]>([]);
  const [tempSubsList, settempSubsList] = useState<DocumentData[]>([]);
  const [initialSubsList, setinitialSubsList] = useState<DocumentData[]>([]);


  useEffect(() => {
    fetchSubscribers();
  }, []);

  useEffect(() => {
    console.log('search: ');
    console.log(searchResultsList);
    setdisplaySubsList(searchResultsList);
  }, [searchResultsList]);

  useEffect(() => {
    console.log('subsList: ')
    console.log(displaySubsList);
    console.log('temp list: ')
    console.log(tempSubsList);
  },[displaySubsList, tempSubsList]);

  useEffect(() => {
    console.log('query is: ' + searchQuery);

    if (searchQuery === ""){
      setdisplaySubsList(initialSubsList);
      console.log('reverted to original list')
      return;
    }

    setisLoading(true);
    getSearchedSubscriber();
    setisLoading(false);

  }, [searchQuery]);

  

  const getSearchedSubscriber = async () => {
    const searchResults : DocumentData[] = [];


    const searchQueryID = query(collection(db, 'Subscribers'), orderBy('FIRSTNAME'),
    where('IDNUMBER', '==', props.searchQuery));
    const resultsID = await getDocs(searchQueryID)

    resultsID.forEach((result) => {
      searchResults.push({...result.data(), key: result.id})
    });

    setsearchResultsList([...searchResults]);
    // Sets the display list to be only the subscriber that was searched
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
  // Adds the array of newly fetched subscribers to the display list of subscribers
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

 const handleClaimPackage = async (id: string, lastName:string, firstName:string) => {
  Swal.fire({
   title: 'Mark this package as claimed?',
   html: '<p>Are you sure you want to mark <strong>' + firstName + ', ' 
   + lastName + '\'s </strong> package as <strong>claimed?</strong></p>',
   icon: 'question',
   showConfirmButton: true,
   confirmButtonText: 'Yes',
   showCancelButton: true
  }).then(async (result)=>{
    if (result.isConfirmed){
      const docRef = await setDoc(doc(db, "Subscribers", id), {
        HASCLAIMED: 'yes',
        CLAIMDATE: serverTimestamp()
      }, {merge: true}).then(()=>{
        Swal.fire(
          'Success!',
          'Subscriber info has been successfully updated.',
          'success'
        ).then(()=>{
          fetchSubscribers()
        });
      }).catch((error)=>{
        Swal.fire(
          'Error!',
          error.message,
          'error'
        )
      })
    }
  })
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