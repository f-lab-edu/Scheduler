/** @jsx createElement */
import createElement from '@/utils/createElement';
import { ICard } from 'types/types';
import date from '@/assets/calendar-check.svg';

export default function TaskList({ status }: { status: ICard }) {
  return (
    <li>
      <article className={`task-card ${status.priority.toLowerCase()}`}>
        <header className="task-card-header">
          <span className="date-wrapper">
            <img src={date} alt="date" />
            <time>{status.startDate}</time>
            {status.endDate || ''}
          </span>
          <span className="priority">{status.priority} priority</span>
        </header>
        <div className="task-contents">
          <h3>{status.title}</h3>
          <p>{status.description}</p>
        </div>
      </article>
    </li>
  );
}

// export default class TaskList {
//   status: ICard;
//   constructor(status: ICard) {
//     this.status = status;
//     console.log(status);
//   }

//   render(): string {
//     return `
//       <li>
//         <article class="task-card ${this.status.priority.toLowerCase()}">
//             <header class="task-card-header">
//                 <span class="date-wrapper">
//                     <img src=${date} alt="date">
//                     <time>${this.status.startDate}</time>
//                     ${this.status.endDate || ''}
//                 </span>
//                 <span class="priority">${this.status.priority} priority</span>
//             </header>
//             <div class="task-contents">
//                 <h3>${this.status.title}</h3>
//                 <p>${this.status.description}</p>
//             </div>
//         </article>
//       </li>
//     `;
//   }
// }
