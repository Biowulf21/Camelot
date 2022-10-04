import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import MerlinMailing from "./sub-components/mailing";
import Template from "./sub-components/template";

function MerlinPage() {
  const [ActiveTab, setActiveTab] = useState("Templates");
  const defaultActiveTabKey: string = "Templates";

  useEffect(() => {
    //Will run every time the page loads. This stores the active tab in the session storage bucket
    // to make sure that tabs stay the same after the page loads.
    let activeTabKey: string = "";
    const sessionStorageKey: string | null =
      sessionStorage.getItem("activeTabKey");

    sessionStorageKey != null
      ? (activeTabKey = sessionStorageKey)
      : (activeTabKey = defaultActiveTabKey);

    setActiveTab(activeTabKey);
  });

  const saveActiveTabKeyToSessionStorage = (tab_key: string) => {
    setActiveTab(tab_key);

    sessionStorage.setItem("activeTabKey", tab_key);
  };

  return (
    <Tabs
      activeKey={ActiveTab}
      onSelect={(tab_key) =>
        saveActiveTabKeyToSessionStorage(
          tab_key != null ? tab_key : defaultActiveTabKey
        )
      }
      id="merlin-tabs"
      defaultActiveKey={"Templates"}
    >
      <Tab eventKey={"Templates"} title={"Templates"}>
        <Template></Template>
      </Tab>
      <Tab eventKey={"Mail"} title={"Mail"}>
        <MerlinMailing></MerlinMailing>
      </Tab>
      <Tab eventKey={"Report"} title={"Report"}></Tab>
      <Tab eventKey={"History"} title={"History"}></Tab>
    </Tabs>
  );
}

export default MerlinPage;
