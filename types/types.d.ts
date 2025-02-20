export type TPriorities = 'High' | 'Medium' | 'Low';
export type Tab = 'Board' | 'Calendar';
export type DefaultListType = 'To do' | 'In Progress' | 'Done';
export type StatusListType = DefaultListType | string;

export interface IDefaultInfo {
  title: string;
  startDate: string;
  endDate?: string;
  priority: Priorities;
}

export interface Card extends IDefaultInfo {
  description: string;
}

export interface IStatusList {
  listType: StatusListType;
  detailCard: Card[];
  totalCount: number;
}

export interface IFilter {
  listType: StatusListType[];
  priorities: Priorities[];
}
