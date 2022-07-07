import { doc, setDoc, onSnapshot, query, collection, QueryDocumentSnapshot, DocumentData, addDoc } from "firebase/firestore"; 
import TEMPLATE_PATH from "../firebase-constants";
import { db } from "../firebase-config";

interface SaveProps{
    title:string;
    subject:string;
    body:string;
}
export class Template {
    // Constructor
    constructor(){

    }

   async saveTemplate(props:SaveProps) {
        await addDoc(collection(db, TEMPLATE_PATH), {
            title: props.title,
            subject: props.subject,
            body: props.body
        }).then(() => console.log('done saving'))
    }

    async getTemplates(){
        const q = query(collection(db, TEMPLATE_PATH));
        const snapshot = onSnapshot(q, (querySnapshot) => {
          const cities:DocumentData = [];
          querySnapshot.forEach((doc) => {
              cities.push(doc.data());
          });
          console.log(cities);
        });
    }
}