import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { CSVtoJson } from "../../../../../services/CSVtoJSON/csv-to-json-v2";
import "./styles.css";
import CSVReader from "./sub-components/csv-reader";
import HeadersDetected from "./sub-components/headers-detected";
import ReceipientList from "./sub-components/reciepient-list/receipient-list";

const MerlinMailing = () => {
  const [csvFile, updateCSVFile] = useState<any>({ data: [] });
  const [headers, updateHeaders] = useState<[]>([]);
  const [receipientList, updateReceipientList] = useState<[]>([]);
  const [emailIndex, updateEmailIndex] = useState<number>(0);

  const CSVService = new CSVtoJson();

  const handleCSV = async () => {
    try {
      const parsedCSVFile: any = CSVService.CSVtoJSON(csvFile);
      const { headers, body, emailIndex } = parsedCSVFile;
      if (parsedCSVFile instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: parsedCSVFile.message,
        });
      }

      updateHeaders(headers);
      updateReceipientList(body[0]);
      updateEmailIndex(emailIndex);
    } catch (error) {
      if (typeof error === "string") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      } else if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again.",
        });
      }
    }
  };

  if (emailIndex === -1) {
    return (
      <div className="container my-3">
        <h3>Email Column not found</h3>
        <p>The CSV file uploaded did not have the required EMAIL column.</p>
        <p>Please upload the corrected file.</p>
        <Button onClick={() => window.location.reload()}>Reload Page</Button>
      </div>
    );
  }

  return (
    <Container fluid className="main-div m-5">
      <Row>
        <Col className="align-items-center">
          <HeadersDetected headers={headers}></HeadersDetected>
        </Col>
        <Col className="align-items-center">
          <h2 style={{ textAlign: "center" }}>Receipients Detected</h2>
          <Row>
            <Col>
              <b>Count:</b>
            </Col>
            <Col>
              <p>{receipientList.length}</p>
            </Col>
          </Row>
          <div className="receipient-div">
            <ReceipientList receipientList={receipientList}></ReceipientList>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <CSVReader
            csvFile={csvFile}
            updateCSVFile={updateCSVFile}
          ></CSVReader>
        </Col>
      </Row>
      <Button className="my-2" onClick={() => handleCSV()}>
        Parse
      </Button>
    </Container>
  );
};

export default MerlinMailing;
