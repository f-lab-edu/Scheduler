import { ITask, TPriorities } from 'types/types';

export default class Agenda extends HTMLElement {
  private _monthlyTasks: ITask[];
  private selectedPriorities: TPriorities[];

  constructor() {
    super();
    this._monthlyTasks = [];
    this.selectedPriorities = [];
  }
  connectedCallback() {
    this.render();
    this.renderTasks();
  }

  set monthlyTasks(tasks: ITask[]) {
    this._monthlyTasks = tasks;
    this.renderTasks();
  }

  set filteredPriority(priorities: TPriorities[]) {
    this.selectedPriorities = priorities;
    console.log('🟢', priorities);
    //TODO: filtering 해야함
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
