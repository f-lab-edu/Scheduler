import { ICard } from 'types/types';
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
    ];
  }

  connectedCallback() {
    this.render();
    this.setTaskListState();
  }

  private setTaskListState() {
    const $taskListEl = this.querySelector('task-list') as HTMLElement & { taskList?: ICard[]; count?: number };
    if ($taskListEl) {
      $taskListEl.taskList = this.taskList;
      this.totalCount = this.taskList.length;
    }
  }

  // TODO: statusHeader 속성으로 보내는 값 프로퍼티로 처리
  private setStatusHeader() {
    const $statusHeaderEl = this.querySelector('status-header') as HTMLElement;
    if ($statusHeaderEl) {
      // $statusHeaderEl.status = 'To do';
    }
  }

  render() {
    this.innerHTML = `
        <ul class="task-list">
            <status-header status="To do" count="${this.taskList.length}"></status-header>
            <task-list ></task-list>
        </ul>      
    `;
  }
}

customElements.define('status-list', StatusList);
