import './StatusHeader';
import './TaskList';
import './AddStatusList';
import StatusHeader from './StatusHeader';
import TaskList from './TaskList';
import { ICard } from '../../../types/types';
import AddStatusList from './AddStatusList';

export default class StatusList extends HTMLElement {
  totalCount: number;
  taskList: ICard[];
  _isClickedAddStatus: boolean;

  // TODO: 데이터 입력 모달 생성 후 삭제
  constructor() {
    super();
    this.totalCount = 0;
    this._isClickedAddStatus = false;

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
    this.setEventListener();
  }

  get isClickedAddStatus() {
    return this._isClickedAddStatus;
  }

  set isClickedAddStatus(isClicked: boolean) {
    this._isClickedAddStatus = isClicked;
    this.updateAddStatusList();
  }

  private updateAddStatusList() {
    const $addStatusList = this.querySelector('add-status-list') as AddStatusList;
    if ($addStatusList) {
      $addStatusList.isClickedAddStatus = this._isClickedAddStatus;
    }
  }

  private setTaskListState() {
    const $taskList = this.querySelector('task-list') as TaskList;

    if ($taskList) {
      $taskList.taskList = this.taskList;
      this.totalCount = this.taskList.length;
    }
  }

  private setStatusHeader() {
    const $statusHeader = this.querySelector('status-header') as StatusHeader;

    if ($statusHeader) {
      $statusHeader.columStatus = 'To do';
      $statusHeader.count = this.totalCount;
    }
  }

  private setEventListener() {
    this.addEventListener('button-click', () => {
      this._isClickedAddStatus = true;
      this.handleClickAddButton();
    });
  }

  private handleClickAddButton() {}

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
