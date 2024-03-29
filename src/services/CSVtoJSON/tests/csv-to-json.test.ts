import {CSVtoJson} from "../csv-to-json-v2";

test("Properly formats CSV to JSON objects.", () => {
    const converter = new CSVtoJson();
    // data key skips the last array element, as it is the headers of the CSV file.
    const positiveData = {data: [['email', 'name'],['james@example.com', 'James Jilhaney'],
    ['email', 'name']]};
    const result = converter.CSVtoJSON(positiveData);

    expect(result).toStrictEqual({headers:["EMAIL","NAME"], 
    body:[[{"EMAIL":"james@example.com","NAME":"James Jilhaney"}]],
    emailIndex:0})
})

// Email index value returns -1 when the CSV file has no email column.
test("Throws error when no email column is found.", ()=>{
    const converter = new CSVtoJson();
    const negativeData = {data: [['notemail', 'name'],['james@example.com', 'James Jilhaney'], 
    ['email', 'name']]};
    const result = converter.CSVtoJSON(negativeData);

    expect(result).toStrictEqual({headers:["NOTEMAIL","NAME"], 
    body:[[{"NOTEMAIL":"james@example.com","NAME":"James Jilhaney"}]],
    emailIndex:-1})
})

// JSON value should return null if the cell is empty/has an empty string
test("Returns a default null value if the cell contains an empty string.", () => {
    const converter = new CSVtoJson();
    // data key skips the last array element, as it is the headers of the CSV file.
    const positiveData = {data: [['email', 'name'],['james@example.com', ''],
    ['email', 'name']]};
    const result = converter.CSVtoJSON(positiveData);

    expect(result).toEqual({headers:["EMAIL","NAME"], 
    body:[[{"EMAIL":"james@example.com","NAME":null}]],
    emailIndex:0})
})