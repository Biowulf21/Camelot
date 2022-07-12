import React, { useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import './styles.css'
import Papa from 'papaparse';
import CSVReader from './csv-reader';
import { counter } from '@fortawesome/fontawesome-svg-core';

type CSVFILE = {
    data: []
}

const MerlinMailing = () => {
    const [csvFile, updateCSVFile] = useState<any>({data:[]});
    const [csvLength, updateCSVLength] = useState<number | null>(null);
    const str = JSON.stringify(csvFile)

    const handleCSVtoJSON = () =>{
        const obj = {}
      const {data} = csvFile;
      const length = Object.keys(data).length

      var x = 1
      var headerObject:any = {}

      data.forEach((colCounter: any[])=>{
        if (x === 1){
            for (var headerCounter=0; headerCounter< colCounter.length; headerCounter++){

                console.log(colCounter[headerCounter]);
                const currentHeader:string = colCounter[headerCounter]
                const tempVar = currentHeader
                console.log(currentHeader +' oten')

               headerObject[tempVar] = tempVar
            }
            console.log(headerObject)
        } else{
            console.log(colCounter)
        }
        x = x+1
      })
      
  
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