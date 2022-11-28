import { doc, setDoc, onSnapshot, query, collection, QueryDocumentSnapshot, DocumentData, addDoc, getDocs, deleteDoc } from "firebase/firestore"; 
import { db } from "./../firebase-config";

interface SaveProps{
    title:string;
    subject:string;
    body:string;
}
export class Template {
    // Constructor
    constructor(){

    }

    async getTemplates(): Promise<DocumentData[]>{
        const templates:DocumentData[] = []
        const q = query(collection(db, 'Templates'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc)=>{
        templates.push({...doc.data(), key: doc.id})
    })
        return templates;
    }

    async saveNewTemplate(title: string, subject:string, body:string){
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let resultID ='';
        for (var i = 0; i< 20; i++){
            resultID += characters.charAt(Math.floor(Math.random() * characters.length))
        }

        //convert string to base 64
        const base64Body = window.btoa(body)

        const data = {
            id: resultID,
            title,
            subject,
           body: base64Body
        }
        await setDoc(doc(db, 'Templates', resultID), data);
       } 
    
       async deleteTemplate (id:string):Promise<void>{
        const deleteRef = await deleteDoc(doc(db, 'Templates', id))
       }
}