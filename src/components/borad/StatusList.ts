import '@/components/borad/StatusHeader';
import '@/components/borad/TaskList';
import '@/components/borad/AddStatusList';
import StatusHeader from '@/components/borad/StatusHeader';
import AddStatusList from '@/components/borad/AddStatusList';
import { ITask } from '../../../types/types';
import { createStatus, getAllStatuses } from '@/data/indexedDBService';
import TaskList from '@/components/borad/TaskList';

export default class StatusList extends HTMLElement {
  private totalCount: number;
  private _clickedAddStatus: boolean;
  private _newStatusTitle: string;
  private _showConfirmDialog: boolean = false;
  private _statusId: string | null;

  constructor() {
    super();
    this.totalCount = 0;
    this._clickedAddStatus = false;
    this._newStatusTitle = '';
    this._statusId = null;
  }

  connectedCallback() {
    this.render();
    this.loadStatus();
    this.setEventListener();
    this.setupStatusCreationHandler();
  }

  get totalTaskCount(): number {
    return this.totalCount;
  }

  get clickedAddStatus() {
    return this._clickedAddStatus;
  }

  set clickedAddStatus(isClicked: boolean) {
    this._clickedAddStatus = isClicked;
    this.handleAddNewStatusClick();
  }

  get showConfirmDialog() {
    return this._showConfirmDialog;
  }

  set showConfirmDialog(isShow: boolean) {
    this._showConfirmDialog = isShow;
    this.render();
  }

  set statusId(id: string) {
    this._statusId = id;
  }

  get statusId(): string | null {
    return this._statusId;
  }

  private handleAddNewStatusClick() {
    const $addStatusList = this.querySelector('add-status-list') as AddStatusList;
    if ($addStatusList) {
      $addStatusList.clickedAddStatus = this._clickedAddStatus;
    }
  }

  private setStatusHeader($container: HTMLElement, statusTitle: string, count: number) {
    const $statusHeader = $container.querySelector('status-header') as StatusHeader;

    if ($statusHeader) {
      $statusHeader.statusTitle = statusTitle;
      $statusHeader.count = count;
    }
  }

  private setEventListener() {
    this.addEventListener('button-click', () => {
      this._clickedAddStatus = true;
    });
  }

  private setupStatusCreationHandler() {
    this.addEventListener('status-title-saved', async (event: Event) => {
      const customEvent = event as CustomEvent<{ title: string }>;
      this._newStatusTitle = customEvent.detail.title;

      try {
        const newStatusId = await createStatus(this._newStatusTitle);
        this.applyStatusUI(newStatusId, this._newStatusTitle);
      } catch (error: any) {
        console.log(error);
      }
    });
  }

  private async loadStatus() {
    try {
      const statusList = await getAllStatuses();
      statusList.forEach((status) => {
        console.log('');
        this.applyStatusUI(status.id, status.statusTitle);
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  private applyStatusUI(id: number, title: string) {
    const $newStatus = document.createElement('ul');
    $newStatus.classList.add('task-list');
    $newStatus.setAttribute('data-id', id.toString());

    $newStatus.innerHTML = `
        <status-header></status-header>
        <task-list></task-list>  
  `;

    const $addStatusList = this.querySelector('add-status-list');
    if ($addStatusList) {
      $addStatusList.insertAdjacentElement('beforebegin', $newStatus);
      this.setStatusHeader($newStatus, title, 0);
    }

    const $taskList = $newStatus.querySelector('task-list') as TaskList;
    $taskList.statusId = id.toString();
  }

  render() {
    this.innerHTML = `
        <section class="status-list">
            <add-status-list></add-status-list>
        </section>
            `;
  }
}

customElements.define('status-list', StatusList);
