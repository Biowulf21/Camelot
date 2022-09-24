import React from 'react'
import { useState, useEffect } from 'react'
import useDebounce from '../../../hooks/useDebounce'
import Arthur from './arthur-main'
import SubscriberListComponent from './sub-components/subscriber-list'

const ArthurPage = () => {
    const [searchQuery, setSearchQuery] = useState("");

  return (
    <Arthur updateSearchQuery={setSearchQuery}>
          <SubscriberListComponent searchQuery={searchQuery}></SubscriberListComponent>
    </Arthur>
  )
}

export default ArthurPage