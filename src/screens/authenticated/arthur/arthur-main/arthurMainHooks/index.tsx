import { doc, setDoc } from 'firebase/firestore';
import React from 'react'
import Swal from 'sweetalert2';
import { subscriberDataInterface } from '..';
import { CSVtoJson } from '../../../../../services/CSVtoJSON/csv-to-json-v2';
import { db } from '../../../../../services/firebase-config';

interface ArthurMainHooksInterface {
    csvFile: any;
    setcsvFile: React.Dispatch<any>;
    setuploadingMaxCount:React.Dispatch<React.SetStateAction<number>>;
    setcurrentUploadingCount:React.Dispatch<React.SetStateAction<number>>;
    setisUploading:React.Dispatch<React.SetStateAction<boolean>>;
    handleClose: ()=>void;
}

const ArthurMainHooks = (props: ArthurMainHooksInterface) => {
    const handleParseCSVFile = async () =>{
    const CSVParser = new CSVtoJson();
    const parsedUploadData:any = CSVParser.CSVtoJSON(props.csvFile);
    
    const {body} = parsedUploadData;

    const isValidCSV = handleValidatingCSVFile(parsedUploadData);
    if (isValidCSV instanceof Error) {
      console.log(isValidCSV.message)
      Swal.fire(
        'Whoops... Something went wrong.',
        'Something went wrong with the uploaded file. Please try again later',
        'error'
        );
      }
     
      try{
        if (isValidCSV instanceof Error) throw isValidCSV;
        if (isValidCSV === false) throw new Error(`The uploaded file is not a valid CSV file. 
        Please refer to the documentation and try again.`);

      } catch(error){
        if (error instanceof Error){
          console.log(error.message)
          Swal.fire(
            'Oops! Something went wrong.',
            error.message,
            'error'
          )
        } else {
          console.log(error);
          Swal.fire(
            'Oops! Something went wrong.',
            'error'
          )
          props.setcsvFile([])
        }

        return;
      }

      props.setuploadingMaxCount(body[0].length);
      handleUploadSubscriberData(body[0]);
    }

    const handleValidatingCSVFile = (parsedData:any) =>{
      const {headers} = parsedData;

        if(parsedData instanceof Error){
            return Error(parsedData.message);
        }
        const expectedHeaders = ['LASTNAME', 'FIRSTNAME', 'IDNUMBER', 'EMAIL', 
        'COURSE', 'BATCHYEAR', 'HASCLAIMED', 'CLAIMDATE'];

        const hasAllHeaders = checkIfHeadersMatch(headers, expectedHeaders);
        console.log('Done checking headers.');
        return hasAllHeaders;

    }

    const checkIfHeadersMatch  = (target:string[], pattern:string[]) => {
        console.log('checking if headers match');
        // Check if all the headers of the CSV File are matched against Firebase expected fields for 
        // subscriber data

       let matchCounter = 0; 
       const expectedHeaderCount = pattern.length;
       pattern.forEach((header)=>{
        if (target.includes(header)){
        matchCounter++;
        }
       }) 

       if (matchCounter === expectedHeaderCount){
       console.log('Done matching');
        return true;
       }
       console.log('Done matching');
       return false;
    }

    const handleUploadSubscriberData = async (subscriberData:[]) =>{
        console.log('Starting upload');
        props.setisUploading(value => !value);

        for(var i = 0; i <= subscriberData.length-1; i++){
          const subData:subscriberDataInterface = subscriberData[i];
          await setDoc(doc(db, "Subscribers", subData.IDNUMBER), subData)
          // eslint-disable-next-line no-loop-func
          .then(() =>{
              props.setcurrentUploadingCount(i);
          }).catch((error) => {
            console.log(error.message);
          })
        }
        
        Swal.fire(
          'Finished uploading',
          'Subscriber Data has been uploaded successfully.',
          'success'
        ).then(()=>{
          // cleans the state of Arthur
          props.setcurrentUploadingCount(0);
          props.setuploadingMaxCount(0);
          props.setcsvFile({data:[]})
          props.setisUploading(value => !value);
          props.handleClose();      
        });


        }

  return {handleParseCSVFile}
}

export default ArthurMainHooks