import {CSVtoJson} from "../csv-to-json-v2";

test("Properly formats CSV to JSON objects.", () => {
    const converter = new CSVtoJson();
    const positiveData = {data: [['email', 'name'],['james@example.com', 'James Jilhaney'], ['oten1', 'oten1@gmail.com']]};
    const result = converter.CSVtoJSON(positiveData);

    expect(result).toStrictEqual({headers:["EMAIL","NAME"], body:[[{"EMAIL":"james@example.com","NAME":"James Jilhaney"}]],emailIndex:0})
})

test("Throws error when no email column is found.", ()=>{
    const converter = new CSVtoJson();
    const positiveData = {data: [['notemail', 'name'],['james@example.com', 'James Jilhaney'], ['oten1', 'oten1@gmail.com']]};
    const result = converter.CSVtoJSON(positiveData);

    expect(result).toStrictEqual({headers:["NOTEMAIL","NAME"], body:[[{"NOTEMAIL":"james@example.com","NAME":"James Jilhaney"}]],emailIndex:-1})
})