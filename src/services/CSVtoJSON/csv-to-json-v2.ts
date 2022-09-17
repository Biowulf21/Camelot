
interface CSVFileInterface {
  data: [] | string[][];
}

interface ParsedCSVFileInterface {
  body: {}[];
  headers: string[];
  emailIndex: number;
}

interface ReceipientObjectInterface {
  [key: string]: string;
}

export class CSVtoJson {
  CSVBody: string[][] = [];
  CSVEmailColumnIndex: number = 0;
  recepients: string[][] = [];
  headers: string[] = [];
  receipientsJSON: {}[] = [];

  CSVData: ParsedCSVFileInterface = {
    headers: this.headers,
    body: this.receipientsJSON,
    emailIndex: this.CSVEmailColumnIndex,
  };

  CSVtoJSON = (file: CSVFileInterface) => {
    // console.log(file.data)
    const { data } = file;
    this.CSVBody = data;
    var CSVColumnCounter = 0;

    try {
      // Iterates thrthis.CSVBody.forEach((CSVRow)=>{
      this.CSVBody.forEach((CSVRow) => {
        if (CSVColumnCounter === 0) {
          for (const column in CSVRow) {
            const header: string = CSVRow[column];
            // Changes all headers to uppercase
            const headerText: string = header.toUpperCase();
            this.headers.push(headerText);
          }
          const emailIndex = this.headers.indexOf("EMAIL");
          this.CSVData.emailIndex = emailIndex;
        } else {
          this.recepients.push(CSVRow);
        }
        CSVColumnCounter += 1;
      });
      this.receipientsJSON.push(this.arrToJSON(this.recepients));
      // this.receipientsJSON.pop()
      // console.log(this.receipientsJSON);
      return this.CSVData;
    } catch (error) {
      if (typeof error === "string") {
        return Error(error);
      } else if (error instanceof Error) {
        return Error(error.message);
      } else {
        return Error("Something went wrong. Please try again.");
      }
    }
  };

  arrToJSON = (receipientsArray: string[][]) => {
    const receipientsJSONArray: {}[] = [];
    const headers = this.headers;
    // removes useless empty row
    receipientsArray.pop();
    // get each individual receipient from the receipient list
    for (const receipient in receipientsArray) {
      const currentReceipient = receipientsArray[receipient];
      var currentHeader = "";
      var currentHeaderValue = "";
      var currentObject: ReceipientObjectInterface = {};
      // console.log(currentReceipient)
      for (const header in headers) {
        currentHeader = headers[header];
        currentHeaderValue = currentReceipient[header];
        currentObject[currentHeader] = currentHeaderValue;
      }
      receipientsJSONArray.push(currentObject);
    }

    return receipientsJSONArray;
  };

  ParseCSVHeaders = () => {
    console.log("Parsing CSV Headers");
  };

  FindEmailColumn = () => {
    console.log("Finding EMAIL column");
  };
}
