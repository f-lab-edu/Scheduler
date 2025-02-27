export type TPriorities = 'High' | 'Medium' | 'Low';
export type TTab = 'Board' | 'Calendar';
export type TDefaultList = 'To do' | 'In Progress' | 'Done';
export type TStatusList = TDefaultList | string;

export interface ITabTaskInfo {
  totalTaskCount: number;
  tabName: TTab;
}
export interface IDefaultInfo {
  title: string;
  startDate: string;
  endDate?: string;
  priority: TPriorities;
}

export interface ICard extends IDefaultInfo {
  description: string;
}

export interface IStatusList {
  listType: TStatusList;
  taskCount: number;
}

export interface IFilter {
  listType: TStatusList[];
  priorities: TPriorities[];
}

export interface IButton {
  buttonClass: string;
  imgSrc?: string;
  imgClass?: string;
  text?: string;
  onClick: () => void;
}
