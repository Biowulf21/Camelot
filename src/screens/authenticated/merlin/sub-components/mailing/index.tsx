import React, { useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import './styles.css'
import Papa from 'papaparse';
import CSVReader from './csv-reader';

type CSVFILE = {
    data: []
}

const MerlinMailing = () => {
    const [csvFile, updateCSVFile] = useState({data:[]});
    const [csvLength, updateCSVLength] = useState<number | null>(null);
    const str = JSON.stringify(csvFile)

    const handleCSVtoJSON = () =>{
        const obj = {}
      console.log(JSON.parse(str))
      const {data} = csvFile;
      const length = Object.keys(data).length
      console.log(length)
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
            <Button className='my-2' onClick={handleCSVtoJSON}>Parse</Button>
    </Container>
    </div>
  )
}

export default MerlinMailing