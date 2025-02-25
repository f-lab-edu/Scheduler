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
