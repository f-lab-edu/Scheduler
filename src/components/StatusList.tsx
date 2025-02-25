/** @jsx createElement */
import createElement from '@/utils/createElement';
import { IStatusList } from 'types/types';
import TaskList from './TaskList';
import StatusHeader from './StatusHeader';
import { taskDataList } from '@/data/mockData';

export default function StatusList({ statusData }: { statusData: IStatusList }) {
  return (
    <ul className="task-list">
      <StatusHeader status={statusData.listType} count={statusData.taskCount} />

      {taskDataList.map((task) => (
        <TaskList status={task} />
      ))}
    </ul>
  );
}
