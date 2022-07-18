interface CSVFileInterface {
    data: [] | [][]
}

interface ParsedCSVFileInterface{
    body: [][],
    headers:string[]
}



export class CSVtoJson{
    CSVBody:[][] = []
    CSVEmailColumnIndex: number = 0;
    recepients: [][] = []
    headers:string[] = []
    
    CSVData:ParsedCSVFileInterface = {
        headers: this.headers,
        body: this.recepients
     }
     
     CSVtoJSON = (file:CSVFileInterface) => {
         const {data} = file
         this.CSVBody = data
         var CSVColumnCounter = 0;
         
         try{
             // Iterates thrthis.CSVBody.forEach((CSVRow)=>{
                 this.CSVBody.forEach((CSVRow)=>{
                     if (CSVColumnCounter === 0){
                         for (const column in CSVRow){
                            const header:string = CSVRow[column]
                            // Changes all headers to uppercase
                            const headerText:string = header.toUpperCase()
                            this.headers.push(CSVRow[column])
                            }
            } else {
                this.recepients.push(CSVRow)
            }
            CSVColumnCounter +=1
        })

        return this.CSVData
        
    }catch(error){
      if (typeof error === 'string'){
          return Error(error)
      } else if (error instanceof Error){
          return Error(error.message)
      } else {
        return Error('Something went wrong. Please try again.')
      }
  }
}
    
ParseCSVHeaders = () =>{
    console.log('Parsing CSV Headers');
}

FindEmailColumn = () => {
    console.log('Finding EMAIL column');
    
}



}