import React from "react";
import { FormSelect, ListGroup, ListGroupItem, Row } from "react-bootstrap";

interface HeaderListInterface {
  headers: [];
}

const HeadersDetected = (headersInput: HeaderListInterface) => {
  const { headers } = headersInput;
  return (
    <>
      <Row>
        <div className="headers-detected-div">
          <h1>Headers Detected</h1>
          <ListGroup>
            {headers.length > 0 ? (
              headers.map((header) => {
                return <ListGroupItem>{header}</ListGroupItem>;
              })
            ) : (
              <p style={{ textAlign: "center" }}>No Headers to display</p>
            )}
          </ListGroup>
        </div>
      </Row>
    </>
  );
};

export default HeadersDetected;
