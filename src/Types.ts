interface IBrowserScreen {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface ITabData {
  id: string;
  browserData: IBrowserScreen;
}

interface ITabsData {
  tabs: ITabData[];
}

export type { IBrowserScreen, ITabsData };
