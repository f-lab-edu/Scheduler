import '@/components/common/ActionGroup';
import '@/components/borad/StatusList';
import '@/components/calendar/CalendarContents';
import StatusList from '@/components/borad/StatusList';
import ActionGroup from '@/components/common/ActionGroup';
import { deleteStatus } from '@/data/indexedDBService';
import { createConfirmDialog } from '@/components/common/modal/ModalTemplates';
import Calendar from '@/components/calendar/Calendar';
import TaskList from '@/components/borad/TaskList';

export default class Contents extends HTMLElement {
  private selectedTab: string;
  private addClicked: boolean;
  private _totalCount: number;

  constructor() {
    super();
    this.selectedTab = 'Board';
    this.addClicked = false;
    this._totalCount = 0;
  }

  connectedCallback() {
    this.render();
    this.handleAddNewButtonClick();
    this.updateTotalTaskCount();
    this.setupRemoveConfirmationHandler();
    this.updateActionGroupCount();
    this.setupPriorityChanged();
    this.setupInputChangeListener();
  }

  handleAddNewButtonClick() {
    this.addEventListener('add-new-clicked', () => {
      this.addClicked = true;
      this.createNewStatus();
    });
  }

  createNewStatus() {
    const $statusList = this.querySelector('status-list') as StatusList;
    if ($statusList) {
      $statusList.addClicked = this.addClicked;
    }
  }

  static get observedAttributes() {
    return ['selected-tab'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'selected-tab' && oldValue !== newValue) {
      this.render();
      this.updateActionGroupCount();
    }
  }

  private updateTotalTaskCount() {
    this.addEventListener('task-count-update', (event: Event) => {
      const selectedTabAttr = this.getAttribute('selected-tab');
      if (selectedTabAttr === null || selectedTabAttr === 'Board') {
        this._totalCount = 0;
        const $taskList = this.querySelectorAll('task-list') as NodeListOf<TaskList>;
        $taskList.forEach((task) => {
          this._totalCount += task.taskCount;
        });
      }
      this.updateActionGroupCount();
    });
  }

  private updateActionGroupCount() {
    const $actionGroup = this.querySelector('action-group') as ActionGroup;
    if ($actionGroup) {
      $actionGroup.totalCount = this._totalCount;
    }
  }

  private setupRemoveConfirmationHandler() {
    this.addEventListener('remove-click', (event: Event) => {
      const message = '모든 하위 일정이 삭제 됩니다. </br> 삭제하시겠습니까?';
      const confirmButtonText = '삭제';
      const cancelButtonText = '취소';
      const cancelHandler = () => {
        document.body.removeChild($confirmDialog);
      };
      const confirmHandler = async () => {
        try {
          document.body.removeChild($confirmDialog);
          const $statusList = this.querySelector('status-list') as HTMLElement;

          if ($statusList) {
            const $targetButton = event.target as HTMLElement;
            const $taskList = $targetButton.closest('ul.task-list') as HTMLUListElement | null;

            if ($taskList) {
              await deleteStatus(Number($taskList.dataset.id));
              $taskList.remove();
              this.dispatchEvent(new CustomEvent('task-count-update'));
            }
          }
        } catch (error: any) {
          console.log(error.message);
        }
      };
      const $confirmDialog = createConfirmDialog(
        message,
        confirmButtonText,
        confirmHandler,
        cancelButtonText,
        cancelHandler,
      );
      document.body.appendChild($confirmDialog);
    });
  }

  private setupPriorityChanged() {
    this.addEventListener('priority-changed', (event: Event) => {
      const { selectedPriorities } = (event as CustomEvent).detail;
      const $taskLists = this.querySelectorAll('task-list');
      $taskLists.forEach((taskList) => {
        (taskList as any).filteredPriority = selectedPriorities;
      });

      const $calendar = this.querySelector('calendar-contents calendar-element') as Calendar;
      if ($calendar) {
        $calendar.filteredPriority = selectedPriorities;
      }
    });
  }

  private setupInputChangeListener() {
    this.addEventListener('search-input-changed', (event: Event) => {
      const { targetValue } = (event as CustomEvent).detail;
      const $taskLists = this.querySelectorAll('task-list');
      $taskLists.forEach((taskList) => {
        (taskList as any).searchValue = targetValue;
      });

      const $calendar = this.querySelector('calendar-contents calendar-element') as Calendar;
      if ($calendar) {
        $calendar.searchValue = targetValue;
      }
    });
  }

  render() {
    const selectedTab = this.getAttribute('selected-tab') || 'Board';
    this.innerHTML = `
        <section class="contents">
            <action-group selected-tab="${selectedTab}"></action-group>
            ${selectedTab === 'Board' ? '<status-list></status-list>' : '<calendar-contents></calendar-contents>'}
        </section>
    `;
  }
}

const isRegistered = customElements.get('contents-element');
if (!isRegistered) {
  customElements.define('contents-element', Contents);
}
