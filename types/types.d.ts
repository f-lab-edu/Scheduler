export type Priorities = 'High' | 'Medium' | 'Low';
export type Tab = 'Board' | 'Calendar';
export type DefaultListType = 'To do' | 'In Progress' | 'Done';
export type ListType = DefaultListType | string;

export interface DefaultInfo {
  title: string;
  startDate: string;
  endDate?: string;
  priority: Priorities;
}

export interface Card extends DefaultInfo {
  description: string;
}

export interface List {
  listType: ListType;
  detailCard: Card[];
  totalCount: number;
}

export interface Filter {
  listType: ListType[];
  priorities: Priorities[];
}
