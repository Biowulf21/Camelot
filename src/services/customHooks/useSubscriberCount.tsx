import React, { useState } from 'react'
import { db } from '../firebase-config'
import { doc, DocumentData, DocumentSnapshot, onSnapshot, setDoc } from 'firebase/firestore'

const useSubscriberCountIncrement = async (incrementCount: number) => {
    const [currentSubscriberCount, setcurrentSubscriberCount] = useState();
    const [subscriberCountDocumentData, setsubscriberCountDocumentData] = useState<DocumentData>();

    const subCountRef = onSnapshot(doc(db, "Statistics", "SubscriberCount"), (doc) => {
        setsubscriberCountDocumentData(doc.data());
    });    
    
    setcurrentSubscriberCount(subscriberCountDocumentData?.subscriberCount);

    if (currentSubscriberCount == undefined) return;

    const finalIncrement = currentSubscriberCount + incrementCount;

    await setDoc(doc(db, 'Statistics', 'SubscriberCount'),{
        subscriberCount: finalIncrement
    })

}


export const useSubscriberCountDecrement = async (decrementCount: number) => {}

export default useSubscriberCountIncrement