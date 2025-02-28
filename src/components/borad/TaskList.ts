import { ICard } from 'types/types';
import date from '@/assets/calendar-check.svg';

export default class TaskList extends HTMLElement {
  private _list: ICard[] = [];

  get taskList() {
    return this._list;
  }
  set taskList(value: ICard[]) {
    this._list = value;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <ul>
        ${this.taskList
          ?.map(
            (task: ICard) => `
            <li>
              <article class="task-card ${task.priority.toLowerCase()}">
                <header class="task-card-header">
                  <span class="date-wrapper">
                    <img src="${date}" alt="date">
                    <time>${task.startDate}</time>
                    ${task.endDate ? `<span>${task.endDate}</span>` : ''}
                  </span>
                  <span class="priority">${task.priority} priority</span>
                </header>
                <div class="task-contents">
                  <h3>${task.title}</h3>
                  <p>${task.description}</p>
                </div>
              </article>
            </li>
          `,
          )
          .join('')}
      </ul>
`;
  }
}

customElements.define('task-list', TaskList);
