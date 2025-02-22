import { ICard, IStatusList } from 'types/types';
import TaskList from './TaskList';
import StatusHeader from './StatusHeader';

export default class StatusList {
  statusList: IStatusList[];
  state: ICard[];
  constructor(statusList: IStatusList[]) {
    this.statusList = statusList;
    this.state = [
      {
        title: '프론트엔드공부',
        startDate: 'Today',
        endDate: '',
        priority: 'High',
        description: '기본내용',
      },
    ];
  }

  render(): string {
    const data = this.state.map((item) => {
      const task = new TaskList(item);
      return task.render();
    });

    const statusData = this.statusList.map((status) => {
      const statusHeader = new StatusHeader(status.listType, status.taskCount);
      return statusHeader.render();
    });

    return `
      <ul class="task-list">
          ${statusData}
          ${data}
      </ul>
      `;
  }
}
