import React from 'react'
import "./style.css";
import { useState, useEffect } from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CSVReader from '../merlin/sub-components/mailing/sub-components/csv-reader';
import { CSVtoJson } from '../../../services/CSVtoJSON/csv-to-json-v2';
import Swal from 'sweetalert2';

interface ParsedCSVFileInterface{
    headers: string[]
    body: {}[]
    emailIndex: number
  };

const ArthurPage = () => {
    const [csvFile, setcsvFile] = useState<any>({ data: [] });
    const [SearchTerm, setSearchTerm] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleParseCSVFile = () =>{
    const CSVParser = new CSVtoJson();
    const parsedUploadData = CSVParser.CSVtoJSON(csvFile);
    const isValidCSV = handleValidatingCSVFile(parsedUploadData);
    }

    const handleValidatingCSVFile = (parsedData: ParsedCSVFileInterface | Error) =>{
        console.log(parsedData);

        if(parsedData instanceof Error){
            return Error(parsedData.message);
        }

        const headers = parsedData['headers'];
        const body = parsedData['body'];
        const emailIndex = parsedData['emailIndex'];
        const expectedHeaders = ['LASTNAME', 'FIRSTNAME', 'IDNUMBER', 'EMAIL', 'COURSE', 'COLLEGE'];

        const hasAllHeaders = checkIfHeadersMatch(headers, expectedHeaders);
        if (hasAllHeaders === false) {
            Swal.fire(
                'Incomplete Headers',
                'The headers in the file do not match the expected headers. Please follow the instructions',
                'error'
              ).then(()=>{
                handleClose();
              })
        }
    }

    const checkIfHeadersMatch  = (target:string[], pattern:string[]) => {
        // Check if all the headers of the CSV File are matched against Firebase expected fields for 
        // subscriber data

       let matchCounter = 0; 
       const expectedHeaderCount = 6;
       pattern.forEach((header)=>{
        if (target.includes(header)){
        matchCounter++;
        }
       }) 

       if (matchCounter === expectedHeaderCount){
        return true;
       }

       return false;
    }

    const handleUploadSubscriberData = () =>{

    }

    useEffect(() => {
      console.log(SearchTerm);
    
    }, [SearchTerm] );
    
  return (
    <Container>
        <div className='d-flex justify-content-end'>
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
            <p>Arthur only accepts CSV files when upload, please make 
            sure the file is exported in the proper format.</p>
            <p><strong>Note: </strong> Please make sure that the file has the following headers:
            <strong><code> LastName, FirstName, IDNumber, Email, Course, College.</code></strong>
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