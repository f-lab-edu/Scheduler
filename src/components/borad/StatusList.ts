import '@/components/borad/StatusHeader';
import '@/components/borad/TaskList';
import '@/components/borad/AddStatusList';
import StatusHeader from '@/components/borad/StatusHeader';
import AddStatusList from '@/components/borad/AddStatusList';
import { createStatus, getAllStatuses, updateTask } from '@/data/indexedDBService';
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
    this.setupDragDropListeners();
  }

  get totalTaskCount(): number {
    return this.totalCount;
  }

  get addClicked() {
    return this._clickedAddStatus;
  }

  set addClicked(isClicked: boolean) {
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
      $addStatusList.addClicked = this._clickedAddStatus;
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
        console.log(error.message);
      }
    });
  }

  private async loadStatus() {
    try {
      const statusList = await getAllStatuses();
      statusList.forEach((status) => {
        this.applyStatusUI(status.id, status.statusTitle);
      });
    } catch (error: any) {
      console.log(error.message);
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

  private setupDragDropListeners() {
    let $dragTarget: HTMLElement | null = null;
    let $originalParent: HTMLElement | null = null; // 드래그 시작 시 task-list

    // 드래그 시작
    this.addEventListener('dragstart', (event: DragEvent) => {
      if (!event.target) {
        return;
      }
      const $targetTask = (event.target as HTMLElement).closest('li');
      if (!$targetTask) {
        return;
      }
      $dragTarget = $targetTask;
      $originalParent = $targetTask.parentElement as HTMLElement;
      $targetTask.classList.add('dragging');
    });

    this.addEventListener('dragover', (event: DragEvent) => {
      event.preventDefault(); // drop 허용

      if (!event.target) {
        return;
      }
      const $targetTask = (event.target as HTMLElement).closest('li');
      if (!$targetTask) {
        return;
      }
      // 자기 자신이면 무시
      if ($targetTask === $dragTarget) {
        return;
      }
      // 마우스 위치, task의 영역을 비교
      const bounding = $targetTask.getBoundingClientRect();
      const offset = event.clientY - bounding.top;

      if (offset > bounding.height / 2) {
        // 마우스가 task 하단 절반에 위치 시
        $targetTask.parentElement?.insertBefore($dragTarget!, $targetTask.nextSibling);
      } else {
        // 마우스가 task 상단 절반에 위치 시
        $targetTask.parentElement?.insertBefore($dragTarget!, $targetTask);
      }

      if ($targetTask && $targetTask !== $dragTarget) {
        $targetTask.classList.add('over');
      }
    });

    // 드래그 대상이 영역을 벗어날 시
    this.addEventListener('dragleave', (event: DragEvent) => {
      if (!event.target) {
        return;
      }

      const $targetTask = (event.target as HTMLElement).closest('li');
      if ($targetTask && $targetTask !== $dragTarget) {
        $targetTask.classList.remove('over');
      }
    });

    //드롭 시점에 DOM 재배치 & 데이터 갱신
    this.addEventListener('drop', (event: DragEvent) => {
      event.preventDefault();
      if (!event.target) {
        return;
      }
      if (!(event.target instanceof HTMLElement)) {
        return;
      }

      const $targetTask = (event.target as HTMLElement).closest('li');
      const $targetTaskList = event.target.closest('.task-list') as HTMLElement; // 다른 status로 옮길 수도 있게

      if ($dragTarget) {
        // 동일 status 내에서 순서 바꾸기
        if ($targetTask && $targetTask.parentElement === $dragTarget.parentElement) {
          $targetTask.parentElement?.insertBefore($dragTarget, $targetTask);
        }
        // 다른 status로 이동
        else if ($targetTaskList && $targetTaskList !== $dragTarget.parentElement) {
          $targetTaskList.appendChild($dragTarget);
        }

        const $newStatusId = $targetTaskList
          ? $targetTaskList.getAttribute('data-id')
          : $dragTarget.parentElement?.getAttribute('data-id');

        if ($targetTaskList && $newStatusId) {
          this.updateIndexedDB($targetTaskList, $newStatusId);
        }
        $dragTarget.classList.remove('dragging');
        document.querySelectorAll('.over').forEach((el) => el.classList.remove('over'));

        $dragTarget = null;
        $originalParent = null;
      }
    });

    // 성공실패 상관없이 drag끝났을 때
    this.addEventListener('dragend', () => {
      if ($dragTarget) {
        $dragTarget.classList.remove('dragging');
        $dragTarget = null;
      }
    });
  }

  private async updateIndexedDB($targetTaskList: HTMLElement, newStatusId: string) {
    const $list = $targetTaskList.querySelectorAll('li');
    $list.forEach((li, index) => {
      const taskId = li.getAttribute('data-task-id');
      if (taskId) {
        updateTask(Number(taskId), { statusId: newStatusId, order: index });
      }
    });
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
