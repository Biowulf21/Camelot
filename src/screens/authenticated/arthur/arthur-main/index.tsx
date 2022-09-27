import React, { Dispatch, SetStateAction } from 'react'
import "./style.css";
import { useState, useEffect } from 'react'
import { Button, Container, Modal, ProgressBar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CSVReader from '../../merlin/sub-components/mailing/sub-components/csv-reader';
import { CSVtoJson } from '../../../../services/CSVtoJSON/csv-to-json-v2';
import Swal from 'sweetalert2';
import { doc, setDoc } from 'firebase/firestore';
import {db} from "../../../../services/firebase-config";
import LoadingComponent from '../../../global-components/loading-component';
import SubscriberListComponent from '../sub-components/subscriber-list';
import useDebounce from '../../../../hooks/useDebounce';
import useSubscriberCountIncrement from '../../../../services/customHooks/useSubscriberCount';
import ArthurMainHooks from './arthurMainHooks';

export  interface subscriberDataInterface{
LASTNAME:string, FIRSTNAME:string, EMAIL:string,
IDNUMBER:string, COURSE:string, BATCHYEAR:string
}

interface ArthurProps{
  children: React.ReactNode;
  updateSearchQuery: Dispatch<SetStateAction<string>>;
  subscriberCount: number;
}

const Arthur = (props:ArthurProps) => {
  
    const [csvFile, setcsvFile] = useState<any>({ data: [] });
    const [TempSearchTerm, setTempSearchTerm] = useState("");
    const [show, setShow] = useState(false);
    const [isUploading, setisUploading] = useState<boolean>(false);
    const [currentUploadingCount, setcurrentUploadingCount] = useState(0);
    const [uploadingMaxCount, setuploadingMaxCount] = useState(1);


    // This function allows us to only save the current search string to state
    // once the user has finished typing
    const debouncedSearch = useDebounce(TempSearchTerm, 500);

    useEffect(() => {
      //update the search query from parent state 
      // by getting the value of debouncedSearch
      props.updateSearchQuery(debouncedSearch);
    },[debouncedSearch])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {handleParseCSVFile} = ArthurMainHooks({csvFile, setcsvFile, setuploadingMaxCount, 
      setcurrentUploadingCount, setisUploading, handleClose});
    
    if(isUploading === true) {
        return(
        <>
        <Container className="upload-loading">
            <div className='progress-bar-text'><h1><strong>Currently Uploading the Subscriber Data</strong></h1></div>
            <LoadingComponent></LoadingComponent>
            <ProgressBar variant="success" animated min={1} max={uploadingMaxCount} label={`${currentUploadingCount + "/" + uploadingMaxCount}`} now={currentUploadingCount} />
        </Container>
        </>
        
        );
    }
    
  return (
    <Container className="arthur-container">
        <div className='d-flex justify-content-end mt-3'>
            <Button onClick={handleShow} variant="success">Upload Data <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
            <Button onClick={handleShow} style={{marginLeft: "5px"}}>Add Subscriber <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
        </div>
        <div className="arthur-search-div">
            <div className='search-bar d-flex w-100 justify-content-center'>
                <input onChange={(event)=>setTempSearchTerm(event.target.value)} type='text' className="search-box m-3 p-3 w-75" placeholder="Search Subscriber's ID Number"/>
            </div>
            <div>
              {props.children}
            </div>
        </div>
       
        <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        centered
        size='lg'
      >
        <Modal.Header closeButton>
            <div>
                <Modal.Title className="mb-1">
                    <strong>Upload Subscriber Package Data</strong>
                </Modal.Title>
            
            </div>
       </Modal.Header>
        <Modal.Body>
            <p>Arthur only accepts CSV files when uploading, please make 
            sure the file is exported in the proper format.</p>
            <p><strong>Note: </strong> Please make sure that the file has the following headers:
            <strong><code> LastName, FirstName, IDNumber, Email, Course, BatchYear, HasClaimed, and ClaimDate.</code></strong>
            </p><br/>
            <CSVReader
            csvFile={csvFile}
            updateCSVFile={setcsvFile}
          ></CSVReader>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Read Documentation</Button>
          <Button onClick={handleParseCSVFile} variant="primary">Upload</Button> 
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Arthur;