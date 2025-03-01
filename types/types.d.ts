export type TPriorities = 'High' | 'Medium' | 'Low';
export type TTab = 'Board' | 'Calendar';
export type TDefaultList = 'To do' | 'In Progress' | 'Done';

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
  listType: string;
  taskCount: number;
}

export interface IFilter {
  listType: string[];
  priorities: TPriorities[];
}

export interface IButton {
  buttonClass: string;
  imgSrc?: string;
  imgClass?: string;
  text?: string;
  onClick: () => void;
}
