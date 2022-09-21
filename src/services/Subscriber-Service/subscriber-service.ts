import { collection, DocumentData, getDocs, query } from "firebase/firestore";
import { db } from "../firebase-config";

export class Subscribers {
    constructor(){

    }

    async getSubscribers(): Promise<DocumentData[]>{
        const subscribers:DocumentData[] = []
        const q = query(collection(db, 'Subscribers'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc)=>{
        subscribers.push({...doc.data(), key: doc.id})
    })
        return subscribers;
    }

}