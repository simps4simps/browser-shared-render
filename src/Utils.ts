import { IBrowserScreen } from "./Types";

const getBrowserScreenData = (): IBrowserScreen => {
  const getBrowserScreenData: IBrowserScreen = {
    height: window.innerHeight,
    width: window.innerWidth,
    left: window.screenLeft,
    top: window.screenTop,
  };

  return getBrowserScreenData;
};

const addToOpenTabs = (): void => {
  const openedTabs: string | null = window.localStorage.getItem("TABSOPEN");
  if (openedTabs) {
    const openedTabsInt: number = parseInt(openedTabs) + 1;
    window.localStorage.setItem("TABSOPEN", openedTabsInt.toString());
  } else {
    window.localStorage.setItem("TABSOPEN", "1");
  }
};

const removeFromOpenTabs = (): void => {
  const openedTabs: string | null = window.localStorage.getItem("TABSOPEN");
  if (openedTabs) {
    const openedTabsInt: number = parseInt(openedTabs) - 1;
    window.localStorage.setItem("TABSOPEN", openedTabsInt.toString());
  }
};

export { getBrowserScreenData, addToOpenTabs, removeFromOpenTabs };
