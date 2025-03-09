import { ITask } from 'types/types';

export default class Agenda extends HTMLElement {
  private _monthlyTasks: ITask[];

  constructor() {
    super();
    this._monthlyTasks = [];
  }
  connectedCallback() {
    this.render();
    this.renderTasks();
  }

  set monthlyTasks(tasks: ITask[]) {
    this._monthlyTasks = tasks;
    this.renderTasks();
  }

  private renderTasks() {
    const $agenda = document.querySelector('.agenda');
    if ($agenda) {
      $agenda.innerHTML = `
      ${this._monthlyTasks
        .map(
          (task) => `
          <div class="task-wrapper">
            <div class="priority-color ${task.priority}"></div>
            <time>${task.startDate.slice(5)} ~ ${task.endDate.slice(5)}</time>
            <div>${task.title}</div>
          </div>
        `,
        )
        .join('')}
      `;
    }
  }

  render() {
    this.innerHTML = `
        <div class="agenda">
        </div>
    `;
  }
}

customElements.define('agenda-element', Agenda);
