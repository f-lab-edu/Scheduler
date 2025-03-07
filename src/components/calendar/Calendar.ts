import { createIconButton } from '../common/button/buttonTemplates';
import leftIcon from '@/assets/caret-left-fill.svg';
import rightIcon from '@/assets/caret-right-fill.svg';
import { getTasksByMonth } from '@/data/indexedDBService';
import Agenda from '@/components/calendar/Agenda';
import { ITask } from 'types/types';
import { formatDashDate } from '@/util/helpers';
import EiditorModal from '../common/modal/EditorModal';

export default class Calendar extends HTMLElement {
  MONTH_NAMES: string[];
  WEEK: string[];
  date: Date;
  today: number;
  month: number;
  year: number;
  constructor() {
    super();
    const date = new Date();
    this.MONTH_NAMES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AGU', 'SEP', 'OCT', 'NOV', 'DEC'];
    this.WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.date = new Date();
    this.today = date.getDate();
    this.month = date.getMonth();
    this.year = date.getFullYear();
  }

  connectedCallback() {
    this.render();
    this.generateCalendarCell();
    this.setupButtonClickListeners();
    this.loadStatus();
    this.setupTaskClickListener();
  }

  private generateCalendarCell() {
    // 현대 달(앞뒤 달 자투리 날짜 포함)
    const firstDay = new Date(this.year, this.month, +1);
    const startDay = firstDay.getDay(); //달의 시작 요일
    const thisLastDate = new Date(this.year, this.month + 1, 0).getDate();
    const prevLastDate = new Date(this.year, this.month, 0).getDate();

    let cells = '';
    for (let i = 0; i < startDay; i++) {
      const prevMonthday = prevLastDate - startDay + (i + 1);
      cells += `
          <div class="day-cell">
              <span class="day-num prev-month-day">${prevMonthday}</span>
          </div>`;
    }

    for (let thisMonthday = 1; thisMonthday <= thisLastDate; thisMonthday++) {
      const dayStr = String(thisMonthday).padStart(2, '0');
      const monthStr = String(this.month + 1).padStart(2, '0');
      const dateStr = `${this.year}-${monthStr}-${dayStr}`;

      cells += `
          <div class="day-cell" data-date="${dateStr}">
              <span class="day-num">${thisMonthday}</span>
          </div>
      `;
    }

    const totalCellCount = 42;
    const totalCellUsed = startDay + thisLastDate;
    const nextDays = totalCellCount - totalCellUsed;
    for (let nextMonthDay = 1; nextMonthDay <= nextDays; nextMonthDay++) {
      cells += `
          <div class="day-cell">
              <span class="day-num next-month-day">${nextMonthDay}</span>
          </div>
      `;
    }
    return cells;
  }

  private handleMonthChange(directionNum: number) {
    this.month += directionNum;
    if (this.month < 0) {
      this.month = 11;
      this.year -= 1;
    } else if (this.month > 11) {
      this.month = 0;
      this.year + 1;
    }
    this.render();
    this.loadStatus();
  }

  private setupButtonClickListeners() {
    this.addEventListener('click', (event: Event) => {
      const $target = event.target as HTMLElement;
      if ($target.closest('.prev-button')) {
        this.handleMonthChange(-1);
      } else if ($target.closest('.next-button')) {
        this.handleMonthChange(1);
      }
    });
  }

  private setupTaskClickListener() {
    this.addEventListener('click', (event: Event) => {
      const $target = event.target as HTMLElement;
      if ($target.closest('.task-bar')) {
        const taskId = $target.closest('.task-bar')?.getAttribute('data-task-id');
        const $editorModal = document.createElement('editor-modal') as EiditorModal;

        if (taskId) {
          $editorModal.taskId = taskId;

          $editorModal.addEventListener('update-complete', () => {
            this.render();
            this.loadStatus();
          });

          document.body.appendChild($editorModal);
        }
      }
    });
  }

  private async loadStatus() {
    try {
      const monthStr = this.month < 10 ? String(this.month + 1).padStart(2, '0') : this.month + 1;
      const monthlyData = await getTasksByMonth(`${this.year}-${monthStr}`);

      this.applyStatusUI(monthlyData);

      const $calendarContents = this.closest('calendar-contents');
      if (!$calendarContents) {
        return;
      }
      const $agenda = $calendarContents.querySelector('agenda-element') as Agenda;

      $agenda.monthlyTasks = monthlyData;
    } catch (error: any) {
      console.log(error);
    }
  }

  private applyStatusUI(data: ITask[]) {
    const taskRowIndexMap = new Map<number, number>();
    let nextAvailableRowIndex = 0;

    data.forEach((task) => {
      // rowIndex 있는지 쳌
      if (!taskRowIndexMap.has(Number(task.id))) {
        taskRowIndexMap.set(Number(task.id), nextAvailableRowIndex);
        nextAvailableRowIndex++;
      }
      const rowIndex = taskRowIndexMap.get(Number(task.id))!;

      const start = new Date(task.startDate);
      const end = new Date(task.endDate);
      let current = new Date(start);

      while (current <= end) {
        const dateStr = formatDashDate(current);
        const $cell = this.querySelector<HTMLDivElement>(`.day-cell[data-date="${dateStr}"]`);
        if ($cell) {
          const $taskBar = document.createElement('div');
          $taskBar.classList.add('task-bar', 'priority-color', `${task.priority}`);
          $taskBar.style.top = `${rowIndex * 30 + 20}px`;
          $taskBar.style.borderRadius = '0';

          $taskBar.dataset.taskId = String(task.id);

          if (dateStr === formatDashDate(start) || current.getDay() === 0) {
            $taskBar.textContent = task.title;
          }

          $cell.appendChild($taskBar);
        }
        current.setDate(current.getDate() + 1);
      }
    });
  }

  render() {
    this.innerHTML = `
        <div class="calendar-header">
            ${createIconButton('prev-button', leftIcon, 'left-icon')}
            <h2>${this.MONTH_NAMES[this.month]}</h2>
            ${createIconButton('next-button', rightIcon, 'next-icon')}
        </div>
        <div class="calendar">
            <div class="week-days">
                ${this.WEEK.map((day) => `<div>${day}</div>`).join('')}
            </div>
            <div class="calendar-grid">${this.generateCalendarCell()}
            </div>
        </div>
    `;
  }
}

customElements.define('calendar-element', Calendar);
