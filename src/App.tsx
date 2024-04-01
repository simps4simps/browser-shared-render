import { useEffect, useState } from "react";
import "./App.css";
import { IBrowserScreen } from "./Types";
import {
  getBrowserScreenData,
  removeFromOpenTabs,
  addToOpenTabs,
} from "./Utils";

// Add on to tabs when loaded
addToOpenTabs();
console.log(localStorage.getItem("TABSOPEN"));

const App = () => {
  const [browserScreen, setBrowserScreen] = useState<IBrowserScreen>(
    {} as IBrowserScreen
  );

  // Remove from tabs when unload
  useEffect(() => {
    window.addEventListener("unload", removeFromOpenTabs);
  }, []);

  // Assign browser data { width , height, top, left } to BrowserScreen
  useEffect(() => {
    setInterval(() => {
      setBrowserScreen(getBrowserScreenData());
    }, 300);
  }, []);

  return <div></div>;
};

export default App;
