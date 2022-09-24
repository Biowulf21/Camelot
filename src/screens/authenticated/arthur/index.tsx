import React from 'react'
import { useState, useEffect } from 'react'
import Arthur from './arthur-main'
import SubscriberListComponent from './sub-components/subscriber-list'

const ArthurPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [subscriberCount, setSubscriberCount] = useState(0);

  return (
    <Arthur updateSearchQuery={setSearchQuery} subscriberCount={subscriberCount}>
          <SubscriberListComponent searchQuery={searchQuery} setSubscriberCount={setSubscriberCount}></SubscriberListComponent>
    </Arthur>
  )
}

export default ArthurPage