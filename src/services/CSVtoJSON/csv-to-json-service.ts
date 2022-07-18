

export class CSVtoJSON1 {
  emailColumnIndex = 1;
  receipients:any[] = [] 
  headerObject: { [key: string]: string; }  = {}

 
  handleCSVtoJSON = (csvFile:{data:[]}) =>{
    try{ 
  const {data} = csvFile;
  // const length = Object.keys(data).length
  console.log(data)

  var CSVColumnCounter = 0

  data.forEach((colCounter: any[])=>{
    /*
    First Row is always for column names (e.g Email, Names, Package Types) 
     */
      if (CSVColumnCounter === 0){
        console.log('Finding email column');
        // finding what column it exists
        this.parseHeadersFindEmailCol(colCounter)
        console.log(this.emailColumnIndex)
        
      }
      if (CSVColumnCounter === 1){
        const headerObj = this.parseCSVHeaders(colCounter, this.headerObject)
        console.log('header columns are');
        console.log(this.emailColumnIndex);
        
        
      } else{
        this.receipients.push(colCounter)
      }
      CSVColumnCounter +=1
    
  })
  } catch (error){
        if (typeof error === "string") {
    return Error(error)
    }   else if (error instanceof Error) {
      return Error(error.message)
    }
}
}

  parseHeadersFindEmailCol = (headerObj: any[] ) =>{
    const mailColIndex = headerObj.indexOf('EMAIL')
    console.log('index of email is: ');
    console.log(mailColIndex)
    this.emailColumnIndex = mailColIndex
  }

  parseCSVHeaders = (colCounter:string[], headerObj:{[key:string]:string}) => {
    //getting all headers and putting them into a separate object
    try{
      for (var headerCounter=0; headerCounter<colCounter.length; headerCounter++){
        const currentHeader:string = colCounter[headerCounter]
        const tempVar = currentHeader
        headerObj[tempVar] = tempVar   

      }
    } catch(error){
      if (typeof error === "string") {
        console.log(error)
        }   else if (error instanceof Error) {
          console.log(error.message)
        }
    }
      return headerObj;
    
  };
}
