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

const addTabData = (tabData: string): void => {
  localStorage.setItem("TAB_DATA", tabData);
};

export { getBrowserScreenData, addTabData };
