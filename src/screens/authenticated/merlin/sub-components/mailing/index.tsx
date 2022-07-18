import React, { useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
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
    const str = JSON.stringify(csvFile)

    const CSVService = new CSVtoJson;

    const handleCSV = async () => {
        const parsedCSVFile:any = CSVService.CSVtoJSON(csvFile)
        console.log(parsedCSVFile)
        if (parsedCSVFile instanceof Error){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: parsedCSVFile.message,
              })
        }
    }

    
 
  return (
    <div className='main-div col-md-6'>
    <Container  fluid className='mailing-container'>
        <br>{csvLength}</br>
        <Row>
            <Col>
            <CSVReader csvFile={csvFile} updateCSVFile={updateCSVFile}></CSVReader>
            </Col>
        </Row>
            <Button className='my-2' onClick={()=>handleCSV()}>Parse</Button>
    </Container>
    </div>
  )
}

export default MerlinMailing