import { IStatusList } from 'types/types';
import TaskList from './TaskList';

export default class StatusList {
  statusList: IStatusList[];
  constructor($statusList: IStatusList[]) {
    this.statusList = $statusList;
  }

  render(): HTMLElement {
    const listContainer = document.createElement('ul');
    listContainer.classList.add('task-list');

    // const taskList = new TaskList([]); //데이터

    return listContainer;
  }
}
