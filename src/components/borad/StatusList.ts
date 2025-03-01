import '@/components/borad/StatusHeader';
import '@/components/borad/TaskList';
import '@/components/borad/AddStatusList';
import StatusHeader from '@/components/borad/StatusHeader';
import AddStatusList from '@/components/borad/AddStatusList';
import TaskList from '@/components/borad/TaskList';
import { ICard } from '../../../types/types';

export default class StatusList extends HTMLElement {
  private totalCount: number;
  private taskList: ICard[];
  private _isClickedAddStatus: boolean;
  private _newStatusTitle: string;
  private _isShowConfirmDialog: boolean = false;

  // TODO: 데이터 입력 모달 생성 후 삭제
  constructor() {
    super();
    this.totalCount = 0;
    this._isClickedAddStatus = false;
    this._newStatusTitle = '';

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
    this.setStatusHeader(this, 'To do', this.totalCount);
    this.setEventListener();
    this.updateStatusList();
  }

  get totalTaskCount(): number {
    return this.totalCount;
  }

  get isClickedAddStatus() {
    return this._isClickedAddStatus;
  }

  set isClickedAddStatus(isClicked: boolean) {
    this._isClickedAddStatus = isClicked;
    this.updateAddStatusList();
  }

  get isShowConfirmDialog() {
    return this._isShowConfirmDialog;
  }

  set isShowConfirmDialog(isShow: boolean) {
    this._isShowConfirmDialog = isShow;
    this.render();
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

  private setStatusHeader($container: HTMLElement, statusTitle: string, count: number) {
    const $statusHeader = $container.querySelector('status-header') as StatusHeader;

    if ($statusHeader) {
      $statusHeader.columStatus = statusTitle;
      $statusHeader.count = count;
    }
  }

  private setEventListener() {
    this.addEventListener('button-click', () => {
      this._isClickedAddStatus = true;
    });
  }

  private updateStatusList() {
    this.addEventListener('status-title-saved', (event: Event) => {
      const customEvent = event as CustomEvent<{ title: string }>;
      this._newStatusTitle = customEvent.detail.title;

      const $newStatus = document.createElement('ul');
      $newStatus.classList.add('task-list');
      $newStatus.innerHTML = `
          <status-header></status-header>
          <task-list></task-list>  
      `;

      const $addStatusList = this.querySelector('add-status-list');
      if ($addStatusList) {
        $addStatusList.insertAdjacentElement('beforebegin', $newStatus);
        this.setStatusHeader($newStatus, this._newStatusTitle, 0);
      }
    });
  }

  render() {
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
