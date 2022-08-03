import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

interface HeaderListInterface {
  headers: [];
}

const HeadersDetected = (headersInput: HeaderListInterface) => {
  const { headers } = headersInput;
  return (
    <div>
      <h1>Headers Detected</h1>
      <ListGroup horizontal>
        {headers.length > 0 ? (
          headers.map((header) => {
            return <ListGroupItem>{header}</ListGroupItem>;
          })
        ) : (
          <p style={{ textAlign: "center" }}>No Headers to display</p>
        )}
      </ListGroup>
    </div>
  );
};

export default HeadersDetected;
