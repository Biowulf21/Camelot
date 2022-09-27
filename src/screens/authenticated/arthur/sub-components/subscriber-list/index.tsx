import { DocumentData, Timestamp } from 'firebase/firestore';
import React, {  useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, ListGroup, ListGroupItem, Modal, Row } from 'react-bootstrap';
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
  const [show, setShow] = useState(false);

  // Current subscriber that's being edited's information
  const [currentID, setcurrentID] = useState<string | null>();
  const [currentFName, setcurrentFName] = useState<string | null>();
  const [currentLName, setcurrentLName] = useState<string | null>();
  const [currentBatchYear, setcurrentBatchYear] = useState<string | null>();
  const [currentEmail, setcurrentEmail] = useState<string | null>("");
  const [currentHasClaimedPackage, setcurrentHasClaimedPackage] = useState<boolean | null>();
  const [currentClaimDate, setcurrentClaimDate] = useState<Timestamp | null>();
  const [currentCourse, setcurrentCourse] = useState<string | null>();

   // New subscriber data
   const [newID, setNewID] = useState<string | null>();
   const [newFName, setNewFName] = useState<string | null>();
   const [newLName, setNewLName] = useState<string | null>();
   const [newBatchYear, setNewBatchYear] = useState<string | null>();
   const [newEmail, setNewEmail] = useState<string | null>();
   const [newHasClaimedPackage, setNewHasClaimedPackage] = useState<boolean | null>();
   const [newClaimDate, setNewClaimDate] = useState<Timestamp | null>();
   const [newCourse, setNewCourse] = useState<string | null>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePassDataToEditModal = (id:string|null, fName:string|null, lName:string|null, email:string|null, 
    course:string|null, batchyear:string|null, hasClaimed:boolean|null, currentClaimDate:Timestamp | null) => {
    setcurrentFName(fName);
    setcurrentLName(lName);
    setcurrentEmail(email);
    setcurrentCourse(course);
    setcurrentBatchYear(batchyear);
    setcurrentHasClaimedPackage(hasClaimed);
    setcurrentClaimDate(currentClaimDate);
    handleShow();
  }

  useEffect(() => {
    console.log(newClaimDate?.toDate())
    console.log(currentHasClaimedPackage)
  
  }, [newClaimDate, currentHasClaimedPackage])
  

  const {handleClaimPackage, handleLoadMoreSubs, handleEditSubscriber } = 
  SubscriberListHook({searchQuery, setisLoading, displaySubsList, 
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
      <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onShow={handleShow}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <strong>Editing Subscriber</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Row>
              <Col>
                <Form.Label><strong>Last Name</strong></Form.Label>
                <Form.Control defaultValue={currentLName != null ? currentLName : "Not available"} type='text'
                onChange={(event)=> setNewLName(event.target.value)} 
                placeholder="Doe"></Form.Control>
              </Col>
              <Col>
                <Form.Label><strong>First Name</strong></Form.Label>
                <Form.Control defaultValue={currentFName != null ? currentFName : "Not available"} type='text'
                onChange={(event)=> setNewFName(event.target.value)} 
                placeholder="John"></Form.Control>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label><strong>Email</strong></Form.Label>
                <Form.Control defaultValue={currentEmail != null ? currentEmail : "Not available"} type='email'
                onChange={(event)=> setNewEmail(event.target.value)} 
                placeholder="johndoe@example.com"></Form.Control>
              </Col>
              <Col>
                <Form.Label><strong>Batch Year</strong></Form.Label>
                <Form.Control defaultValue={currentBatchYear != null ? parseInt(currentBatchYear) : 2021} type='number' min={1948} max={2099}
                onChange={(event)=> setNewBatchYear(event.target.value.toString())} 
                placeholder="ex. 2020"></Form.Control>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label><strong>Claim Date</strong></Form.Label>
                <Form.Control disabled={currentHasClaimedPackage == null ? false : true} 
                defaultValue={currentClaimDate?.toDate().toISOString().substring(0, 10)} type='date'
                onChange={(event)=>setNewClaimDate(Timestamp.fromDate(new Date(event.target.value)))} 
               placeholder="Input claim date"></Form.Control>
              </Col>
              <Col>
                <Form.Label><strong>Has Claimed?</strong></Form.Label>
                <Form.Select aria-label='has-claimed-select'  
                onChange={(event)=>setcurrentHasClaimedPackage(event.target.value === "true"? true: null)}>
                <option value="false">Yes</option> 
                <option value="true">No</option>
                </Form.Select>
              </Col>
            </Row>
            <Row style={{paddingLeft: "10px", paddingRight: "10px"}}>
              <Form.Label><strong>Course</strong></Form.Label>
              <Form.Control  defaultValue={currentCourse != null ? currentCourse : 
                "Not available"} type='text'></Form.Control>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" >Save</Button>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
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
                      <Button onClick={() => handlePassDataToEditModal(
                        subscriber.IDNUMBER, subscriber.FIRSTNAME, subscriber.LASTNAME, subscriber.EMAIL,
                        subscriber.COURSE, subscriber.BATCHYEAR, subscriber.HASCLAIMED, subscriber.CLAIMDATE
                      )} className="sublist-btn" variant='success'>Edit</Button>
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