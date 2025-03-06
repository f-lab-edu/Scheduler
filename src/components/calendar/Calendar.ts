import { createIconButton } from '../common/button/buttonTemplates';
import leftIcon from '@/assets/caret-left-fill.svg';
import rightIcon from '@/assets/caret-right-fill.svg';
import { getTasksByMonth } from '@/data/indexedDBService';

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
          <div >
              <span class="day-num prev-month-day">${prevMonthday}</span>
          </div>`;
    }

    for (let thisMonthday = 1; thisMonthday <= thisLastDate; thisMonthday++) {
      cells += `
          <div>
              <span class="day-num">${thisMonthday}</span>
          </div>
      `;
    }

    const totalCellCount = 42;
    const totalCellUsed = startDay + thisLastDate;
    const nextDays = totalCellCount - totalCellUsed;
    for (let nextMonthDay = 1; nextMonthDay <= nextDays; nextMonthDay++) {
      cells += `
          <div>
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

  private async loadStatus() {
    try {
      const monthStr = this.month < 10 ? '0' + (this.month + 1) : this.month + 1;
      const monthData = await getTasksByMonth(`${this.year}-${monthStr}`);
      // TODO: monthData를 기반으로 agenda 그리기
      console.log('🐽', monthData);
    } catch (error: any) {
      console.log(error);
    }
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
