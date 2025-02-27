import { ICard, TStatusList } from '../../../types/types';
import './StatusHeader';
import './TaskList';

export default class StatusList extends HTMLElement {
  totalCount: number;
  taskList: ICard[];
  // TODO: 데이터 입력 모달 생성 후 삭제

  constructor() {
    super();
    this.totalCount = 0;
    this.taskList = [
      {
        title: '프론트엔드공부',
        startDate: 'Today',
        endDate: '',
        priority: 'High',
        description: '기본내용',
      },
      {
        title: '프론트엔드공부',
        startDate: 'Today',
        endDate: '',
        priority: 'Low',
        description: '기본내용',
      },
    ];
  }

  connectedCallback() {
    this.render();
    this.setTaskListState();
    this.setStatusHeader();
  }

  private setTaskListState() {
    const $taskList = this.querySelector('task-list') as HTMLElement & { taskList?: ICard[]; count?: number };
    if ($taskList) {
      $taskList.taskList = this.taskList;
      this.totalCount = this.taskList.length;
    }
  }

  private setStatusHeader() {
    const $statusHeader = this.querySelector('status-header') as HTMLElement & {
      columStatus: TStatusList;
      count: number;
    };
    if ($statusHeader) {
      $statusHeader.columStatus = 'To do';
      $statusHeader.count = this.totalCount;
    }
  }

  render() {
    this.innerHTML = `
        <ul class="task-list">
            <status-header></status-header>
            <task-list></task-list>
        </ul>      
    `;
  }
}

customElements.define('status-list', StatusList);
