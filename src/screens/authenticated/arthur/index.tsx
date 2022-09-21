import React from 'react'
import "./style.css";
import { useState, useEffect } from 'react'
import { Button, Container, Modal, ProgressBar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CSVReader from '../merlin/sub-components/mailing/sub-components/csv-reader';
import { CSVtoJson } from '../../../services/CSVtoJSON/csv-to-json-v2';
import Swal from 'sweetalert2';
import { addDoc, doc, setDoc, collection} from 'firebase/firestore';
import {db} from "../../../services/firebase-config";
import LoadingComponent from '../../global-components/loading-component';

interface ParsedCSVFileInterface{
    headers: string[]
    body: {}[]
    emailIndex: number
  };

interface subscriberDataInterface{
LASTNAME:string, FIRSTNAME:string, EMAIL:string,
    IDNUMBER:string, COURSE:string, COLLEGE:string
}

const ArthurPage = () => {
  
    const [csvFile, setcsvFile] = useState<any>({ data: [] });
    const [SearchTerm, setSearchTerm] = useState("");
    const [show, setShow] = useState(false);
    const [isUploading, setisUploading] = useState<boolean>(false);
    const [subscriberList, setsubscriberList] = useState<[]>([]);
    const [currentUploadingCount, setcurrentUploadingCount] = useState(0);
    const [uploadingMaxCount, setuploadingMaxCount] = useState(1);

    // useEffect(() => {
    //   console.log('search term is: ' + SearchTerm);
    //   console.log('current uploading: ' + currentUploadingCount);
    //   console.log('max upload: ' + uploadingMaxCount);
    //   console.log('is uploading: ' + isUploading);
    // }, [SearchTerm, currentUploadingCount, uploadingMaxCount, isUploading] );

    useEffect(() =>{
      console.log(isUploading);
      console.log(currentUploadingCount);
    }, [isUploading, currentUploadingCount]);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleParseCSVFile = async () =>{
    const CSVParser = new CSVtoJson();
    const parsedUploadData:any = CSVParser.CSVtoJSON(csvFile);
    
    const {body} = parsedUploadData;

    const isValidCSV = handleValidatingCSVFile(parsedUploadData);
    if (isValidCSV instanceof Error) {
      Swal.fire(
        'Whoops... Something went wrong.',
        'Something went wrong with the uploaded file. Please try again later',
        'error'
        );
      }
     
      try{
        if (isValidCSV instanceof Error) throw isValidCSV;
        if (isValidCSV === false) throw new Error(`The uploaded file is not a valid CSV file. 
        Please refer to the documentation and try again.`);

      } catch(error){
        if (error instanceof Error){
          Swal.fire(
            'Oops! Something went wrong.',
            error.message,
            'error'
          )
        } else {
          Swal.fire(
            'Oops! Something went wrong.',
            'The uploaded file is not a valid CSV file. Please refer to the documentation and try again',
            'error'
          )
        }

        return;
      }

      setuploadingMaxCount(body[0].length);
      const isDone = handleUploadSubscriberData(body[0]);
    }

    const handleValidatingCSVFile = (parsedData:any) =>{
      const {headers} = parsedData;

        if(parsedData instanceof Error){
            return Error(parsedData.message);
        }
        const expectedHeaders = ['LASTNAME', 'FIRSTNAME', 'IDNUMBER', 'EMAIL', 
        'COURSE', 'COLLEGE', 'HASCLAIMED', 'CLAIMDATE'];

        const hasAllHeaders = checkIfHeadersMatch(headers, expectedHeaders);
        console.log('Done checking headers.');
        return hasAllHeaders;

    }

    const checkIfHeadersMatch  = (target:string[], pattern:string[]) => {
        console.log('checking if headers match');
        // Check if all the headers of the CSV File are matched against Firebase expected fields for 
        // subscriber data

       let matchCounter = 0; 
       const expectedHeaderCount = pattern.length;
       pattern.forEach((header)=>{
        if (target.includes(header)){
        matchCounter++;
        }
       }) 

       if (matchCounter === expectedHeaderCount){
       console.log('Done matching');
        return true;
       }
       console.log('Done matching');
       return false;
    }

    const handleUploadSubscriberData = async (subscriberData:[]) =>{
        console.log('Starting upload');
        setisUploading(value => !value);

        for(var i = 0; i <= subscriberData.length-1; i++){
          const subData:subscriberDataInterface = subscriberData[i];
          const docRef = await setDoc(doc(db, "Subscribers", subData.IDNUMBER), subData)
          .then(() =>{
              setcurrentUploadingCount(i);
          }).catch((error) => {
            console.log(error.message);
          })
        }
        
        Swal.fire(
          'Finished uploading',
          'Subscriber Data has been uploaded successfully.',
          'success'
        ).then(()=>{
          // cleans the state of Arthur
          setcurrentUploadingCount(0);
          setuploadingMaxCount(0);
          setcsvFile({data:[]})
          setisUploading(value => !value);
          handleClose();      
        });


        }

   

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
    <Container>
        <div className='d-flex justify-content-end mt-3'>
            <Button onClick={handleShow} variant="success">Upload Data <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
        </div>
        <div className="arthur-search-div">
            <div className='search-bar d-flex w-100 justify-content-center'>
                <input onChange={(event)=>setSearchTerm(event.target.value)} type='text' className="search-box m-3 p-3 w-75" placeholder="Search ID or Last name"/>
            </div>
        </div>
        <div className="subscribers-list-div">test</div>
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
            <strong><code> LastName, FirstName, IDNumber, Email, Course, College, HasClaimed, and ClaimDate.</code></strong>
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

export default ArthurPage;