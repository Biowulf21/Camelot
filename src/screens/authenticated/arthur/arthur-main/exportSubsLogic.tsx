import {
  collection,
  DocumentData,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ExportFiltersInterface } from ".";
import { db } from "../../../../services/firebase-config";

const ExportSubsLogic = (props: ExportFiltersInterface) => {
  const { order, batchYear, spreadSheetFormat } = props;
  const [subsList, setSubsList] = useState<DocumentData[]>([]);

  useEffect(() => {
    console.log("subslist has changed");
    console.log(subsList);
  }, [subsList]);

  async function handleExportData() {
    const subscribers = await ExportQuery(order, batchYear);
  }

  const ExportDataFunction = () => {};

  const ExportQuery = async (order: string, batchYear: string) => {
    var students: DocumentData[] = [];
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
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { handleExportData };
};

export default ExportSubsLogic;
