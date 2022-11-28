import {
  collection,
  DocumentData,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ExportFiltersInterface } from ".";
import { db } from "../../../../services/firebase-config";
import { CSVDownload } from "react-csv";
import Papa from "papaparse";

const ExportSubsLogic = (props: ExportFiltersInterface) => {
  const { order, batchYear, spreadSheetFormat } = props;
  const [subsList, setSubsList] = useState<DocumentData[]>([]);
  const [hasDoneParsingJSON, setHasDoneParsingJSON] = useState(false);
  const [headers, setHeaders] = useState<string[]>([]);

  useEffect(() => {
    try {
      if (subsList.length > 0) {
        const keys = Object.keys(subsList[0]);
        // set the headers of the CSV
        setHeaders(keys);

        subsList.forEach((sub) => {
          var tempKey = "";
          var tempValue = "";
          Object.keys(sub).forEach((key) => {
            if (
              sub[key] instanceof Timestamp ||
              (sub[key] instanceof Date && sub[key] != null)
            ) {
              tempKey = key;
              tempValue = sub[key];
            }
          });
          if (sub[tempKey] != undefined) {
            sub[tempKey] = sub[tempKey].toDate().toLocaleDateString();
          }
        });
        console.log(subsList);
        setHasDoneParsingJSON(false);

        if (props.spreadSheetFormat === "csv") JSONToCSV();
        if (props.spreadSheetFormat === "xlsx") JSONToExcel();
      }
    } catch (e) {
      console.log(e);
    }
  }, [hasDoneParsingJSON]);

  async function handleExportData() {
    const subscribers = await ExportQuery(order, batchYear);
    if (subscribers === true) {
      setHasDoneParsingJSON(true);
    }
  }

  const JSONToCSV = () => {
    var csv = Papa.unparse(subsList);
    // console.log("done");
    // console.log(csv);
    var csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    var csvURL = window.URL.createObjectURL(csvData);

    var testLink = document.createElement("a");
    testLink.href = csvURL;
    testLink.setAttribute("test", "test.csv");
    testLink.click();
  };

  const JSONToExcel = () => {
    console.log("parsing to excel");
  };

  const ExportQuery = async (order: string, batchYear: string) => {
    var students: DocumentData[] = [];
    var tempStudents: DocumentData[] = [];
    const subscribersCollection = collection(db, "Subscribers");

    try {
      if (batchYear === "") {
        console.log("no batch year specified");
        const q = query(
          subscribersCollection,
          orderBy("LASTNAME", order === "" ? "asc" : "desc")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          students.push({ ...doc.data(), key: doc.id });
        });
        setSubsList(students);
        return true;
      } else {
        console.log("has batch year");
        const q = query(
          subscribersCollection,
          where("BATCHYEAR", "==", batchYear),
          orderBy("LASTNAME", order === "" ? "asc" : "desc")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          students.push({ ...doc.data(), key: doc.id });
        });

        setSubsList(students);
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { handleExportData };
};

export default ExportSubsLogic;
