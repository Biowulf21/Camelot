import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  Timestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { SubscriberInterface } from "..";
import { db } from "../../../../../../services/firebase-config";

interface SubscriberListHooksInterface {
  searchQuery: string;
  setisLoading: React.Dispatch<React.SetStateAction<boolean>>;
  displaySubsList: DocumentData[];
  setdisplaySubsList: React.Dispatch<React.SetStateAction<DocumentData[]>>;
  setnoMoreSubs: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubscriberListHook = (props: SubscriberListHooksInterface) => {
  const [lastDoc, setlastDoc] = useState<DocumentData>();
  const [searchResultsList, setsearchResultsList] = useState<DocumentData[]>(
    []
  );
  const [initialSubsList, setinitialSubsList] = useState<DocumentData[]>([]);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  useEffect(() => {
    props.setdisplaySubsList(searchResultsList);
  }, [searchResultsList]);

  useEffect(() => {
    if (props.searchQuery === "") {
      props.setdisplaySubsList(initialSubsList);
      return;
    }

    props.setisLoading(true);
    getSearchedSubscriber();
    props.setisLoading(false);
  }, [props.searchQuery]);

  const getSearchedSubscriber = async () => {
    const searchResults: DocumentData[] = [];

    const searchQueryID = query(
      collection(db, "Subscribers"),
      orderBy("FIRSTNAME"),
      where("IDNUMBER", "==", props.searchQuery)
    );
    const resultsID = await getDocs(searchQueryID);

    resultsID.forEach((result) => {
      searchResults.push({ ...result.data(), key: result.id });
    });

    setsearchResultsList([...searchResults]);
    // Sets the display list to be only the subscriber that was searched
  };

  const fetchSubscribers = async () => {
    props.setisLoading(true);
    const subs = await getSubscribers();
    props.setdisplaySubsList(subs);
    setinitialSubsList(subs);
    props.setisLoading(false);
  };

  const handleLoadMoreSubs = async () => {
    props.setisLoading(true);
    const moreSubs = await getMoreSubscribers();
    if (moreSubs === undefined) {
      props.setisLoading(false);
      return;
    }
    // Adds the array of newly fetched subscribers to the display list of subscribers
    props.setdisplaySubsList((oldSubsList) => [...oldSubsList, ...moreSubs]);
    setinitialSubsList((oldSubsList) => [...oldSubsList, ...moreSubs]);
    props.setisLoading(false);
  };

  const getSubscribers = async () => {
    const subscribers: DocumentData[] = [];
    const q = query(
      collection(db, "Subscribers"),
      orderBy("LASTNAME"),
      limit(10)
    );
    const querySnapshot = await getDocs(q);
    const lastSubDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    setlastDoc(lastSubDoc);
    querySnapshot.forEach((doc) => {
      subscribers.push({ ...doc.data(), key: doc.id });
    });
    return subscribers;
  };

  const getMoreSubscribers = async () => {
    const moreSubscribers: DocumentData[] = [];

    const moreSubsQuery = query(
      collection(db, "Subscribers"),
      orderBy("LASTNAME"),
      startAfter(lastDoc),
      limit(10)
    );

    const moreSubsList = await getDocs(moreSubsQuery);
    const lastSubDoc = moreSubsList.docs[moreSubsList.docs.length - 1];
    setlastDoc(lastSubDoc);
    if (moreSubsList.size === 0) {
      props.setnoMoreSubs(true);
      return;
    }
    moreSubsList.forEach((doc) => {
      moreSubscribers.push({ ...doc.data(), key: doc.id });
    });

    return moreSubscribers;
  };

  const handleClaimYearbook = async (
    id: string,
    lastName: string,
    firstName: string
  ) => {
    Swal.fire({
      title: "Mark this yearbook as claimed?",
      html:
        "<p>Are you sure you want to mark <strong>" +
        firstName +
        ", " +
        lastName +
        "'s </strong> yearbook as <strong>claimed?</strong></p>",
      icon: "question",
      showConfirmButton: true,
      confirmButtonText: "Yes",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const docRef = await setDoc(
          doc(db, "Subscribers", id),
          {
            HASCLAIMED_YB: "yes",
            YB_CLAIM_DATE: serverTimestamp(),
          },
          { merge: true }
        )
          .then(() => {
            Swal.fire(
              "Success!",
              "Subscriber info has been successfully updated.",
              "success"
            ).then(() => {
              if (props.searchQuery === "") {
                fetchSubscribers();
                return;
              }
              getSearchedSubscriber();
            });
          })
          .catch((error) => {
            Swal.fire("Error!", error.message, "error");
          });
      }
    });
  };

  const handleClaimPhotoPackage = async (
    id: string,
    lastName: string,
    firstName: string
  ) => {
    Swal.fire({
      title: "Mark this package as claimed?",
      html:
        "<p>Are you sure you want to mark <strong>" +
        firstName +
        ", " +
        lastName +
        "'s </strong> package as <strong>claimed?</strong></p>",
      icon: "question",
      showConfirmButton: true,
      confirmButtonText: "Yes",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const docRef = await setDoc(
          doc(db, "Subscribers", id),
          {
            HASCLAIMED_PP: "yes",
            PP_CLAIM_DATE: serverTimestamp(),
          },
          { merge: true }
        )
          .then(() => {
            Swal.fire(
              "Success!",
              "Subscriber info has been successfully updated.",
              "success"
            ).then(() => {
              if (props.searchQuery === "") {
                fetchSubscribers();
                return;
              }
              getSearchedSubscriber();
            });
          })
          .catch((error) => {
            Swal.fire("Error!", error.message, "error");
          });
      }
    });
  };

  const handleOpenEditModal = () => {};

  const handleDeleteSubscriber = async (id: string | null | undefined) => {
    if (id == null) {
      Swal.fire(
        "Oops! Something went wrong.",
        "Could not delete subcsriber. Either their records have been deleted or the ID is invalid.",
        "error"
      );
      return false;
    }
    Swal.fire({
      title: "Delete Subscriber?",
      text: "Are you sure you want to delete this subscriber? This cannot be undone.",
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Yes",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          await deleteDoc(doc(db, "Subscribers", id))
            .then(() => {
              Swal.fire(
                "Completed Deletion.",
                "Subscriber deleted successfully.",
                "success"
              ).then(() => {
                fetchSubscribers();
                return true;
              });
            })
            .catch((error) => {
              Swal.fire(
                "Oops! Something went wrong.",
                "Subscriber deletion failed. Please try again.",
                "error"
              ).then(() => {
                fetchSubscribers();
                return false;
              });
            });
        }
      })
      .finally(() => {
        return true;
      });
  };

  const handleEditSubscriber = (editSubsProps: SubscriberInterface) => {
    const subscriberRef = doc(db, "Subscribers", editSubsProps.IDNUMBER);
    setDoc(subscriberRef, editSubsProps, { merge: true })
      .then(() => {
        Swal.fire(
          "Subscriber Data Saved!",
          "The subscriber information has been edited successfully.",
          "success"
        );
      })
      .catch(() => {
        Swal.fire(
          "Oops! Something went wrong.",
          "The subscriber information was not saved successfully. Please try again.",
          "error"
        );
      });
  };

  return {
    handleClaimYearbook,
    handleClaimPhotoPackage,
    handleLoadMoreSubs,
    handleEditSubscriber,
    handleDeleteSubscriber,
  };
};

export default SubscriberListHook;
