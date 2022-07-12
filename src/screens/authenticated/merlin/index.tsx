import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import MerlinMailing from './sub-components/mailing'
import Template from './sub-components/template'

function MerlinPage() {

  return (
    <Tabs defaultActiveKey={'Templates'} >
      <Tab eventKey={'Templates'} title={'Templates'}>
          <Template></Template>
      </Tab>
      <Tab eventKey={'Mail'} title={'Mail'}>
        <MerlinMailing></MerlinMailing>
      </Tab>
      <Tab eventKey={'Report'} title={'Report'}></Tab>
      <Tab eventKey={'History'} title={'History'}></Tab>
    </Tabs>
  )
}

export default MerlinPage