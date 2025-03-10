import { ITask } from 'types/types';
import date from '@/assets/calendar-check.svg';
import { getTasksByStatus } from '@/data/indexedDBService';
import { formatDate } from '@/util/helpers';
import EiditorModal from '@/components/common/modal/EditorModal';
import StatusHeader from '@/components/borad/StatusHeader';
export default class TaskList extends HTMLElement {
  private _statusId: string | null;
  private _list: ITask[];
  private _taskCount: number;

  constructor() {
    super();
    this._list = [];
    this._statusId = null;
    this._taskCount = 0;
  }

  connectedCallback() {
    this.render();
    this.setupTaskCardListener();
  }

  set taskList(value: ITask[]) {
    this._list = value;
    this.render();
  }

  set statusId(id: string) {
    this._statusId = id;
    this.loadTasksByStatus();
  }

  get taskCount() {
    return this._taskCount;
  }

  async loadTasksByStatus() {
    if (!this._statusId) return;
    const tasks = await getTasksByStatus(this._statusId);
    this._taskCount = tasks.length;

    const $taskList = this.closest('ul.task-list');
    if ($taskList) {
      const $statusHeader = $taskList.querySelector('status-header') as StatusHeader;
      if ($statusHeader) {
        $statusHeader.count = this._taskCount;
      }
    }

    this.dispatchEvent(
      new CustomEvent('task-count-update', {
        detail: { count: this._taskCount },
        bubbles: true,
      }),
    );

    this.taskList = tasks;
  }

  private setupTaskCardListener() {
    this.addEventListener('click', (event: Event) => {
      const $target = event.target as HTMLElement;
      if ($target.closest('li')) {
        const taskId = $target.closest('li')?.getAttribute('data-task-id');

        const $editorModal = document.createElement('editor-modal') as EiditorModal;
        const $statusList = this.closest('ul.task-list');

        if (taskId) {
          $editorModal.taskId = taskId;
        }
        if ($statusList) {
          const statusId = $statusList.getAttribute('data-id');
          $editorModal.statusId = statusId!;
        }
        document.body.appendChild($editorModal);
      }
    });
  }

  render() {
    this.innerHTML = `
    <ul>
    ${this._list
      ?.map((task: ITask) => {
        const isSameDate = task.startDate === task.endDate;
        const isToday = task.startDate === new Date().toISOString().split('T')[0];

        let dateStr = '';
        if (isSameDate && isToday) {
          dateStr = 'Today';
        } else if (isSameDate) {
          dateStr = `<time>${formatDate(task.startDate)}</time>`;
        } else {
          dateStr = `<time>${formatDate(task.startDate)}</time> ~ <time>${formatDate(task.endDate)}</time>`;
        }
        return `
                  <li data-task-id="${task.id}">
                    <article class="task-card ${task.priority.toLowerCase()}">
                      <header class="task-card-header">
                        <span class="date-wrapper">
                          <img src="${date}" alt="date">
                          ${dateStr}
                        </span>
                        <span class="priority">${task.priority} priority</span>
                      </header>
                      <div class="task-contents">
                        <h3>${task.title}</h3>
                        <p>${task.description}</p>
                      </div>
                    </article>
                  </li>
            `;
      })
      .join('')}
      </ul>
`;
  }
}

customElements.define('task-list', TaskList);
