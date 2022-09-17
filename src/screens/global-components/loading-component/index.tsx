import React from 'react'
import { Container, Spinner } from 'react-bootstrap'

const LoadingComponent = () => {
  return (
    <Container>
            <div className="d-flex align-items-center justify-content-center text-center my-5">
              <div className='loading-text-div mx-2'>
                  <h1>Loading</h1>
              </div>
              <div className='spinner-div'>
                  <Spinner animation='border'></Spinner>
              </div>
            </div>
          </Container>
  )
}

export default LoadingComponent