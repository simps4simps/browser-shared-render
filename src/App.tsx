import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { IBrowserScreen } from "./Types";
import {
  getBrowserScreenData,
  removeFromOpenTabs,
  addToOpenTabs,
  addTabData,
} from "./Utils";
import Circle from "./components/Circle/Circle";

const App = () => {
  const [browserScreen, setBrowserScreen] = useState<IBrowserScreen>(
    {} as IBrowserScreen
  );
  const [browserId, setBrowserId] = useState<number>(0);
  const [flag, setFlag] = useState<boolean>(false);

  const unloadEvent = useCallback(() => {
    // Remove from tabs when unload
    removeFromOpenTabs(browserId.toString());
  }, []);

  const loadEvent = useCallback(() => {
    // Add on to tabs when loaded
    addToOpenTabs();
    // Assign browser id on load
    const openedTabs: string | null = window.localStorage.getItem("TABSOPEN");

    if (openedTabs) {
      const id: number = parseInt(openedTabs);
      setBrowserId(id);
    }

    // Assgin browser id on Tab close
    window.addEventListener("storage", (data: StorageEvent) => {
      if (data.key == "TABSOPEN" || data.key == "TABCLOSED") console.log(data);
      window.localStorage.setItem("TABCLOSED", "0");
    });
  }, []);

  useEffect(() => {
    window.onload = loadEvent;

    // Onunload on working properly
    window.onunload = unloadEvent;
  }, [unloadEvent, loadEvent]);

  useEffect(() => {
    if (flag) return;
    // Assign browser data { width , height, top, left } to BrowserScreen
    setBrowserScreen(getBrowserScreenData());
    addTabData(browserId, JSON.stringify(browserScreen));

    // Throttle the effect
    setFlag(true);
    setTimeout(() => {
      setFlag(false);
    }, 300);
  }, [browserId, browserScreen, flag]);

  return (
    <>
      <Circle />
      <h1 style={{ color: "white" }}>{browserId}</h1>
    </>
  );
};

export default App;
