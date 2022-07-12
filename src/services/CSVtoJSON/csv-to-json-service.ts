

export class CSVtoJSON {


 
  handleCSVtoJSON = (csvFile:{data:[]}) =>{
  const {data} = csvFile;
  // const length = Object.keys(data).length

  var x = 1
  var headerObject:any = {}
  const receipients:any[] = [] 

  data.forEach((colCounter: any[])=>{
    const counter = colCounter
    if (x === 1){
        const headerObj = this.parseCSVHeaders(counter, headerObject)
        console.log(headerObj)
    } else{
      receipients.push(colCounter)
    }
    x = x+1
  })
  console.log('receipients are: ')
  console.log(receipients[0][0])
  

}

  parseCSVHeaders = (colCounter:string[], headerObj:{[key:string]:string}) => {
    //getting all headers and putting them into a separate object
    for (var headerCounter=0; headerCounter<colCounter.length; headerCounter++){
      const currentHeader:string = colCounter[headerCounter]
      const tempVar = currentHeader
      headerObj[tempVar] = tempVar   
  }
    return headerObj;
  };
}
