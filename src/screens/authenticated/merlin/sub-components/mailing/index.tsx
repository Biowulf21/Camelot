import React, { useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import './styles.css'
import Papa from 'papaparse';
import CSVReader from './csv-reader';
import { counter } from '@fortawesome/fontawesome-svg-core';
import { CSVtoJSON } from '../../../../../services/CSVtoJSON/csv-to-json-service'


type CSVFILE = {
    data: []
}

const MerlinMailing = () => {
    const [csvFile, updateCSVFile] = useState<any>({data:[]});
    const [csvLength, updateCSVLength] = useState<number | null>(null);
    const str = JSON.stringify(csvFile)

    const CSVService = new CSVtoJSON;

    const handleCSV = () => {
        CSVService.handleCSVtoJSON(csvFile)
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