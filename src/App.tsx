import { useEffect, useState } from "react";
import "./App.css";
import { IBrowserScreen, ITabsData } from "./Types";
import { addTabData, getBrowserScreenData } from "./Utils";
import Circle from "./components/Circle/Circle";
import { v4 as uuid } from "uuid";

localStorage.clear();

const App = () => {
  const [browserScreen, setBrowserScreen] = useState<IBrowserScreen>(
    {} as IBrowserScreen
  );
  const [flag, setFlag] = useState<boolean>(false);
  const [browserId, setBrowserId] = useState<string>("");

  useEffect(() => {
    if (flag) return;
    // Assign browser data { width , height, top, left } to BrowserScreen
    setBrowserScreen(getBrowserScreenData());

    // Throttle the effect
    setFlag(true);
    setTimeout(() => {
      setFlag(false);
    }, 300);
  }, [browserScreen, flag]);

  useEffect(() => {
    const idString: string = uuid().slice(0, 8);
    setBrowserId(idString);
  }, []);

  useEffect(() => {
    // Create dummy tab
    const browserScreens: ITabsData = {
      tabs: [
        {
          id: "",
          browserData: {
            height: NaN,
            width: NaN,
            top: NaN,
            left: NaN,
          },
        },
      ],
    };

    addTabData(JSON.stringify(browserScreens));
  }, [browserId]);

  useEffect(() => {
    const tabData: string | null = window.localStorage.getItem("TAB_DATA");
    if (tabData) {
      const browserScreens: ITabsData = JSON.parse(tabData);

      // Check if this browser exists in the local storage
      if (!browserScreens.tabs.find((data) => data.id == browserId)) {
        // If it does not then add it to the storage
        browserScreens.tabs.push({
          browserData: browserScreen,
          id: browserId,
        });
      } else {
        // If it does change the value
        const index: number = browserScreens.tabs.findIndex(
          (data) => data.id == browserId
        );

        browserScreens.tabs[index].browserData = browserScreen;
      }

      addTabData(JSON.stringify(browserScreens));
      console.log(browserScreens);
    }
  }, [browserId, browserScreen]);

  return (
    <>
      <Circle />
      <h1 style={{ color: "white" }}>
        {browserScreen.height}, {browserScreen.width}, {browserScreen.left},{" "}
        {browserScreen.top}
      </h1>
    </>
  );
};

export default App;
