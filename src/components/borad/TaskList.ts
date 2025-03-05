import { ITask } from 'types/types';
import date from '@/assets/calendar-check.svg';
import { getTasksByStatus } from '@/data/indexedDBService';
import { formatDate } from '@/util/helpers';
import EiditorModal from '../common/modal/EditorModal';

export default class TaskList extends HTMLElement {
  private _statusId: string | null;
  private _list: ITask[];

  constructor() {
    super();
    this._list = [];
    this._statusId = null;
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

  async loadTasksByStatus() {
    if (!this._statusId) return;
    const tasks = await getTasksByStatus(this._statusId);
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
            return `
                  <li data-task-id="${task.id}">
                    <article class="task-card ${task.priority.toLowerCase()}">
                      <header class="task-card-header">
                        <span class="date-wrapper">
                          <img src="${date}" alt="date">
                          ${
                            task.startDate === task.endDate && task.startDate === new Date().toISOString().split('T')[0]
                              ? 'Today'
                              : task.startDate === task.endDate
                                ? `<time>${formatDate(task.startDate)}</time>`
                                : `<time>${formatDate(task.startDate)}</time> ~ <time>${formatDate(task.endDate)}</time>`
                          }
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
