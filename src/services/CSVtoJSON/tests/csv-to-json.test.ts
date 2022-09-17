import {CSVtoJson} from "../csv-to-json-v2";

test("Properly formats CSV to JSON objects.", () => {
    const converter = new CSVtoJson();
    const data = {data: [['email', 'name'],['james@example.com', 'James Jilhaney'], ['oten1', 'oten1@gmail.com']]};
    const result = converter.CSVtoJSON(data);
    console.log(JSON.stringify(result));

    expect(result).toStrictEqual({headers:["EMAIL","NAME"], body:[[{"EMAIL":"james@example.com","NAME":"James Jilhaney"}]],emailIndex:0})
})