import { IStatusList } from '../../types/types';

export const cardList: IStatusList[] = [
  {
    listType: 'To do',
    detailCard: [
      {
        title: '공부하기',
        startDate: '20250226',
        endDate: '20250228',
        priority: 'High',
        description: '열심히 공부하기. 범위는 알림장에',
      },
      {
        title: '책 읽기',
        startDate: '20250216',
        endDate: '20250218',
        priority: 'Medium',
        description: '마음의 양식',
      },
      {
        title: '필요한 물품 구매',
        startDate: '20250206',
        // endDate: '20250218',
        priority: 'Medium',
        description: '마음의 양식',
      },
    ],
    totalTaskCount: 3,
  },
  {
    listType: 'In Progress',
    detailCard: [
      {
        title: '공부하기',
        startDate: '20250206',
        endDate: '20250228',
        priority: 'High',
        description: '열심히 매우 열심히 하기',
      },
      {
        title: '프로젝트',
        startDate: '20250216',
        endDate: '20250218',
        priority: 'Medium',
        description: '프로젝트 시 지켜야할 사항은 어쩌구저쩌구저쩌구',
      },
    ],
    totalTaskCount: 2,
  },
  {
    listType: 'Done',
    detailCard: [
      {
        title: '미팅',
        startDate: '20250216',
        // endDate: '20250216',
        priority: 'High',
        description: '열심히 공부하기. 범위는 알림장에',
      },
      {
        title: '쇼핑',
        startDate: '20250210',
        // endDate: '20250218',
        priority: 'Medium',
        description: '마음의 양식',
      },
      {
        title: '저기 갔다오기',
        startDate: '20250206',
        // endDate: '20250218',
        priority: 'Medium',
        description: '저기 가려면 1234버스 타고 가서 지하철 갈아타야함',
      },
    ],
    totalTaskCount: 3,
  },
];
