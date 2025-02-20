import { IStatusList } from 'types/types';

export default class TaskList {
  status?: IStatusList;
  constructor($status?: IStatusList) {
    this.status = $status;
  }

  render(): HTMLElement {
    const taskList = document.createElement('li');
    taskList.classList.add('tastList');

    return taskList;
  }
}
