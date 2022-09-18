import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'

const ArthurPage = () => {
  return (
    <Container>
        <div className="arthur-div">
            <div className='search-bar d-flex w-100 justify-content-center'>
                <input type='text' className="search-box m-3 p-3 w-75" placeholder="Search"/>
            </div>
        </div>
    </Container>
  )
}

export default ArthurPage