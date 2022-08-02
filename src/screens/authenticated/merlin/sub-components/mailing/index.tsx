import React, { useState } from 'react'
import { Button, Col, Container, Form, InputGroup, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import './styles.css'
import CSVReader from './csv-reader';
import {CSVtoJson} from '../../../../../services/CSVtoJSON/csv-to-json-v2'
import Swal from 'sweetalert2';

type CSVFILE = {
    data: []
}

const MerlinMailing = () => {
    const [csvFile, updateCSVFile] = useState<any>({data:[]});
    const [csvLength, updateCSVLength] = useState<number | null>(null);
    const [headers, updateHeaders] = useState<[]>([])
    const [receipientList, updateReceipientList] = useState<[]>([])
    const [emailIndex, updateEmailIndex] = useState<number>(0   )

    const CSVService = new CSVtoJson;

    const handleCSV = async () => {

        try{

            const parsedCSVFile:any = CSVService.CSVtoJSON(csvFile)
            console.log(parsedCSVFile)
            const {headers,body, emailIndex} = parsedCSVFile;
            if (parsedCSVFile instanceof Error){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: parsedCSVFile.message,
                })
            }
            
            updateHeaders(headers)
            updateReceipientList(body[0])
            updateEmailIndex(emailIndex)
            // console.log(body)

        } catch(error){
            if (typeof error === 'string'){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            } else if (error instanceof Error){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Something went wrong. Please try again.",
                })
            }
        }
    }
  
    if (emailIndex === -1){
        return (
        <div className='container my-3'>
            <h3>Email Column not found</h3>
            <p>The CSV file uploaded did not have the required EMAIL column.</p> 
            <p>Please upload the corrected file.</p>
            <Button onClick={() => window.location.reload()}>Reload Page</Button>
        </div> 
            )
    }

    
 
  return (
    <Container fluid className='main-div m-5'>
        <Row >
        <Col className='align-items-center'>
            <h2 style={{textAlign:'center'}}>Headers Detected</h2>
            <ListGroup horizontal>
        {headers.length > 0? headers.map((header)=>{
            return(
                    <ListGroupItem>{header}</ListGroupItem>
                    )
                }): <p style={{textAlign:'center'}}>No Headers to display</p>}
        </ListGroup>
        </Col>
        <Col className='align-items-center'>
            <h2 style={{textAlign:'center'}}>Receipients Detected</h2>
            <Row>
                <Col>
                    <b>Count:</b>
                </Col>
                <Col>
                    <p>{receipientList.length}</p>
                </Col>

            </Row>
        <div className='receipient-div'>
        <ListGroup>
        {receipientList.length > 0? receipientList.map((receipient:{NAME:string, EMAIL:string})=>{
            console.log(receipient)
            return(
                <ListGroupItem key={receipient.EMAIL}>{receipient.NAME !== undefined? receipient.NAME + " : " + receipient.EMAIL : receipient.EMAIL}</ListGroupItem>
                )
            }): <p style={{textAlign:'center'}}>No receipients to display</p>}
        </ListGroup>
            </div>
        </Col>
        </Row>
        <Row className='mt-3'>
            <Col>
            <CSVReader csvFile={csvFile} updateCSVFile={updateCSVFile}></CSVReader>
            </Col>
        </Row>
            <Button className='my-2' onClick={()=>handleCSV()}>Parse</Button>
    </Container>
  )
}

export default MerlinMailing