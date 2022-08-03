import React from 'react'
import { ListGroupItem, ListGroup } from 'react-bootstrap'

interface ReceipientListInterface{
    receipientList: []
}


const ReceipientList = (receipientsList:ReceipientListInterface) => {
    const {receipientList} = receipientsList
  return (
    <ListGroup>
              {receipientList.length > 0 ? (
                receipientList.map(
                  (receipient: { NAME: string; EMAIL: string }) => {
                    console.log(receipient);
                    return (
                      <ListGroupItem key={receipient.EMAIL}>
                        {receipient.NAME !== undefined
                          ? receipient.NAME + " : " + receipient.EMAIL
                          : receipient.EMAIL}
                      </ListGroupItem>
                    );
                  }
                )
              ) : (
                <p style={{ textAlign: "center" }}>No receipients to display</p>
              )}
            </ListGroup>
  )
}

export default ReceipientList