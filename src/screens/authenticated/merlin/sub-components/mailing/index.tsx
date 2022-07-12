import React, { useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import './styles.css'
import Papa from 'papaparse';
import CSVReader from './csv-reader';

const MerlinMailing = () => {
    const [csvFile, updateCSVFile] = useState<object>({});

    const handleCSVtoJSON = () =>{
      console.log(csvFile)
    }

  return (
    <div className='main-div col-md-6'>
    <Container  fluid className='mailing-container'>
        <Row>
            <Col>
            <CSVReader csvFile={csvFile} updateCSVFile={updateCSVFile}></CSVReader>
            </Col>
        </Row>
            <Button className='my-2' onClick={handleCSVtoJSON}>Parse</Button>
    </Container>
    </div>
  )
}

export default MerlinMailing