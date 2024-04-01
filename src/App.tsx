import { useEffect, useState } from "react";
import "./App.css";
import { IBrowserScreen } from "./Types";
import {
  getBrowserScreenData,
  removeFromOpenTabs,
  addToOpenTabs,
} from "./Utils";

addToOpenTabs();
console.log(localStorage.getItem("TABSOPEN"));

const App = () => {
  const [browserScreen, setBrowserScreen] = useState<IBrowserScreen>(
    {} as IBrowserScreen
  );
  useEffect(() => {
    window.addEventListener("unload", removeFromOpenTabs);
  }, []);

  useEffect(() => {
    setInterval(() => {
      setBrowserScreen(getBrowserScreenData());
    }, 300);
  }, []);

  return <div></div>;
};

export default App;
