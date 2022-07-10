import { doc, setDoc, onSnapshot, query, collection, QueryDocumentSnapshot, DocumentData, addDoc, getDocs } from "firebase/firestore"; 
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

    async getTemplates(): Promise<DocumentData[]>{
        const templates:DocumentData[] = []
        const q = query(collection(db, TEMPLATE_PATH));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc)=>{
        templates.push({...doc.data(), key: doc.id})
    })
        return templates;
    }

    async saveNewTemplate():Promise<boolean>{
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(true);
            }, 5000);
          });
       } 
    
}