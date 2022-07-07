import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import './styles.css';

const TemplateBodyViewer = (body:any) => {

  const {body:bodyText} = body;
  console.log(bodyText)
  return (
    <div className='template-body'>
      <ReactMarkdown>{bodyText ? bodyText : "Template Body is Empty"}</ReactMarkdown>
    </div>
  )
}

export default TemplateBodyViewer