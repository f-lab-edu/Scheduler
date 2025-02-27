import './StatusHeader';
import './TaskList';
import { createIconButton } from '@/utils/domButton';
import { ICard, TStatusList } from '../../../types/types';
import plusIcon from '@/assets/plus.svg';
import './AddStatusList';

export default class StatusList extends HTMLElement {
  totalCount: number;
  taskList: ICard[];
  isClickedAddButton: boolean;

  // TODO: 데이터 입력 모달 생성 후 삭제
  constructor() {
    super();
    this.totalCount = 0;
    this.isClickedAddButton = false;

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
    this.setAddEventListener();
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

  private setAddEventListener() {
    this.addEventListener('button-click', () => {
      this.isClickedAddButton = true;
      this.handleClickAddButton();
    });
  }

  private handleClickAddButton() {
    console.log('🟢', this.isClickedAddButton);
  }

  render() {
    // TODO: +버튼이었다가 input 나오는 컴포넌트 만들기, 인자로 여부 받기(Add New도 받아야함)
    this.innerHTML = `
        <section class="status-list">
            <ul class="task-list">
                <status-header></status-header>
                <task-list></task-list>
            </ul>     
            <add-status-list></add-status-list>
        </section>
            `;
  }
}

customElements.define('status-list', StatusList);
