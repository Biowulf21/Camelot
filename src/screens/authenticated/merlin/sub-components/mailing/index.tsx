import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormSelect, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { CSVtoJson } from "../../../../../services/CSVtoJSON/csv-to-json-v2";
import "./styles.css";
import CSVReader from "./sub-components/csv-reader";
import HeadersDetected from "./sub-components/headers-detected";
import ReceipientList from "./sub-components/reciepient-list/receipient-list";
import {
  collection,
  query,
  getDocs,
  QuerySnapshot,
  getDoc,
  doc,
  getDocFromCache,
} from "firebase/firestore";
import { db } from "../../../../../services/firebase-config";

type TemplateFromDatabase = {
  body: string;
  id: string;
  subject: string;
  title: string;
};

interface ReplaceTemplateInterface {
  [key: string]: string;
}
const MerlinMailing = () => {
  const [csvFile, updateCSVFile] = useState<any>({ data: [] });
  const [headers, updateHeaders] = useState<[]>([]);
  const [receipientList, updateReceipientList] = useState<[]>([]);
  const [emailIndex, updateEmailIndex] = useState<number>(0);
  const [templatesList, updateTemplatesList] =
    useState<TemplateFromDatabase[]>();
  const [selectedTemplate, updateSelectedTemplate] =
    useState<TemplateFromDatabase | null>();

  useEffect(() => {
    // Read all subjects here
    getTemplates();

    return () => {
      updateReceipientList([]);
      updateEmailIndex(0);
      updateSelectedTemplate(null);
      updateCSVFile({ data: [] });
      updateHeaders([]);
    };
  }, []);

  // useEffect(() => {
  //   console.log("receipient list", receipientList);
  // }, [receipientList]);

  async function getTemplates() {
    const templateQuery = query(collection(db, "Templates"));
    const snapshot = await getDocs(templateQuery);
    let tempObj = {};
    const tempArr: any = [];
    snapshot.forEach((doc) => {
      tempObj = doc.data();
      tempArr.push(tempObj);
    });
    console.log(tempArr);
    updateTemplatesList([...tempArr]);
  }

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

  async function ProcessEmailforSending() {
    handleCSV();

    receipientList.forEach((subscriber) => {
      const templateWithReplacedValues = ReplaceTemplateValues(subscriber);
    });
  }

  function ReplaceTemplateValues(editTemplateValues: ReplaceTemplateInterface) {
    const currentTemplate = selectedTemplate?.body;
    const base64toString = window.atob(currentTemplate!);
    var temp: string = "";
    for (var [key, value] of Object.entries(editTemplateValues)) {
      const pattern = key;
      const regexp = new RegExp(key, "g");
      if (temp === "") {
        const replacedValue = base64toString.replace(regexp, value);
        temp = replacedValue;
      }
      if (temp !== "") {
        temp = temp.replace(regexp, value);
      }
    }

    console.log(temp);
  }

  async function updateTemplate(templateID: string) {
    const template = templatesList?.find(
      (template) => template.id === templateID
    );

    if (template !== undefined) {
      updateSelectedTemplate(template);
    }
  }

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
        <div className="choose-subject-div mb-5">
          {templatesList != undefined && templatesList?.length > 0 ? (
            <>
              <FormSelect
                defaultValue="NULL"
                isInvalid={selectedTemplate == null ? true : false}
                isValid={selectedTemplate !== null ? true : false}
                onChange={(event) => {
                  updateTemplate(event.target.value);
                }}
              >
                <option value="NULL" disabled>
                  No option selected
                </option>
                {templatesList?.map((template) => {
                  return <option value={template.id}>{template.title}</option>;
                })}
              </FormSelect>
            </>
          ) : null}
        </div>
      </Row>
      <hr></hr>
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
      <Row className="my-5">
        <h4>Add Mailing CSV File</h4>
        <CSVReader csvFile={csvFile} updateCSVFile={updateCSVFile}></CSVReader>
      </Row>
      <Row className="d-flex justify-content-center">
        <Button className="my-2" onClick={() => ProcessEmailforSending()}>
          Send
        </Button>
      </Row>
    </Container>
  );
};

export default MerlinMailing;
