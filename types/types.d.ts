export type TPriorities = 'high' | 'medium' | 'low';
export type TTab = 'Board' | 'Calendar';

export interface ITabTaskInfo {
  totalTaskCount: number;
  tabName: TTab;
}
export interface IDefaultInfo {
  title: string;
  startDate: string;
  endDate: string;
  priority: TPriorities;
}

export interface ITask extends IDefaultInfo {
  id?: string;
  description: string;
  statusId: string | null;
  taskId?: string; //수정 시에만 필요
  months?: string[]; //calendar 달별로 가져올 때
  // startMonth?: string;
  // endMonth?: string;
}

export interface IStatusList {
  id: number; //keyPath (autoIncrement). indexedDB 사용 시 필요
  statusTitle: string;
  taskCount: number;
}

export interface IFilter {
  title: string[];
  priorities: TPriorities[];
}

export interface IButton {
  buttonClass: string;
  imgSrc?: string;
  imgClass?: string;
  text?: string;
  onClick: () => void;
}
