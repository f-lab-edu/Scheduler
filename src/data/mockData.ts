import { ICard, IStatusList } from '../../types/types';

export const cardList: IStatusList[] = [
  {
    listType: 'To do',
    taskCount: 3,
  },
  {
    listType: 'In Progress',
    taskCount: 2,
  },
  {
    listType: 'Done',
    taskCount: 3,
  },
];

export const taskDataList: ICard[] = [
  {
    title: '프론트엔드공부',
    startDate: 'Today',
    endDate: '',
    priority: 'High',
    description: '기본내용',
  },
];
