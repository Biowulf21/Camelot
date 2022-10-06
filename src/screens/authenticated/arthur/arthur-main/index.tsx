import React, { Dispatch, SetStateAction } from "react";
import "./style.css";
import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Modal,
  ProgressBar,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CSVReader from "../../merlin/sub-components/mailing/sub-components/csv-reader";
import LoadingComponent from "../../../global-components/loading-component";
import useDebounce from "../../../../hooks/useDebounce";
import ArthurMainHooks from "./arthurMainHooks";

interface ArthurProps {
  children: React.ReactNode;
  updateSearchQuery: Dispatch<SetStateAction<string>>;
  subscriberCount: number;
}

interface ExportFiltersInterface {
  orderBy: null | string;
  batchYear: null | string;
  spreadSheetFormat: null | string;
}

const Arthur = (props: ArthurProps) => {
  const defaultExportFilters = {
    year: null,
    orderBy: null,
    batchYear: null,
    spreadSheetFormat: null,
  };
  const [csvFile, setcsvFile] = useState<any>({ data: [] });
  const [TempSearchTerm, setTempSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [exportModalShow, setExportModalShow] = useState(false);
  const [isUploading, setisUploading] = useState<boolean>(false);
  const [currentUploadingCount, setcurrentUploadingCount] = useState(0);
  const [uploadingMaxCount, setuploadingMaxCount] = useState(1);
  const [exportFilters, setExportFilters] =
    useState<ExportFiltersInterface>(defaultExportFilters);
  const currentDate = new Date();
  const currentDateYear = currentDate.getFullYear();

  // This function allows us to only save the current search string to state
  // once the user has finished typing
  const debouncedSearch = useDebounce(TempSearchTerm, 500);

  useEffect(() => {
    //update the search query from parent state
    // by getting the value of debouncedSearch
    props.updateSearchQuery(debouncedSearch);
  }, [debouncedSearch]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseExportModal = () => setExportModalShow(false);
  const handleShowExportModal = () => setExportModalShow(true);

  const { handleParseCSVFile } = ArthurMainHooks({
    csvFile,
    setcsvFile,
    setuploadingMaxCount,
    setcurrentUploadingCount,
    setisUploading,
    handleClose,
    handleCloseExportModal,
  });

  if (isUploading === true) {
    return (
      <>
        <Container className="upload-loading">
          <div className="progress-bar-text">
            <h1>
              <strong>Currently Uploading the Subscriber Data</strong>
            </h1>
          </div>
          <LoadingComponent></LoadingComponent>
          <ProgressBar
            variant="success"
            animated
            min={1}
            max={uploadingMaxCount}
            label={`${currentUploadingCount + "/" + uploadingMaxCount}`}
            now={currentUploadingCount}
          />
        </Container>
      </>
    );
  }

  return (
    <Container className="arthur-container">
      <div className="d-flex justify-content-end mt-3">
        <Button onClick={handleShow} variant="warning">
          Upload Data <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </Button>
        <Button
          onClick={handleShow}
          variant="success"
          style={{ marginLeft: "5px" }}
        >
          Add Subscriber <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </Button>
        <Button
          onClick={handleShowExportModal}
          variant="primary"
          style={{ marginLeft: "5px" }}
        >
          Export Subscriber Data
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </Button>
      </div>
      <div className="arthur-search-div">
        <div className="search-bar d-flex w-100 justify-content-center">
          <input
            onChange={(event) => setTempSearchTerm(event.target.value)}
            type="text"
            className="search-box m-3 p-3 w-75"
            placeholder="Search Subscriber's ID Number"
          />
        </div>
        <div>{props.children}</div>
      </div>
      {/* Export Subscribers Modal */}
      <Modal
        show={exportModalShow}
        onHide={handleCloseExportModal}
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <div>
            <Modal.Title className="mb-1">
              <strong>Export Subscriber Data</strong>
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Spreadsheet Format</Form.Label>
            <Form.Select className="mb-2">
              <option value="csv">CSV</option>
              <option value="xlsx">Excel</option>
            </Form.Select>
            <Form.Label>Export Order (Last Name)</Form.Label>
            <Form.Select className="mb-2">
              <option value="ASC">Ascending (A-Z)</option>
              <option value="DESC">Descending (Z-A)</option>
            </Form.Select>
            <Form.Label>Batch Year</Form.Label>
            <Form.Control
              className="mb-2"
              type="number"
              defaultValue={currentDateYear}
              max={2099}
              min={1900}
            ></Form.Control>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Read Documentation</Button>
          <Button variant="primary">Export</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for uploading subcsribers */}
      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <div>
            <Modal.Title className="mb-1">
              <strong>Upload Subscriber Package Data</strong>
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p>
            Arthur only accepts CSV files when uploading, please make sure the
            file is exported in the proper format.
          </p>
          <p>
            <strong>Note: </strong> Please make sure that the file has the
            following headers:
            <strong>
              <code>
                {" "}
                LastName, FirstName, IDNumber, Email, Course, BatchYear,
                HasClaimed, and ClaimDate.
              </code>
            </strong>
          </p>
          <br />
          <CSVReader csvFile={csvFile} updateCSVFile={setcsvFile}></CSVReader>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Read Documentation</Button>
          <Button onClick={handleParseCSVFile} variant="primary">
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Arthur;
