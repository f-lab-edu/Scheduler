import '../common/button/IconButton';
import { createIconButton } from '@/utils/domButton';
import { TStatusList } from 'types/types';
import moreIcon from '@/assets/three-dots.svg';
import plusIcon from '@/assets/plus.svg';

export default class StatusHeader extends HTMLElement {
  status: TStatusList = '';
  taskCount: number = 0;

  connectedCallback() {
    this.render();
  }

  get columStatus() {
    return this.status;
  }
  set columStatus(status: TStatusList) {
    this.status = status;
    this.render();
  }

  get count() {
    return this.taskCount;
  }
  set count(taskLenth) {
    this.taskCount = taskLenth;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="status-header">
          <div class="status-info">
              <h2 class="status">${this.columStatus}</h2>
              <span class="task-count">${this.count}</span>
          </div>  
          <div class="status-btns">
              ${createIconButton('more-button', moreIcon, 'more-icon')}
              ${createIconButton('add-task-button', plusIcon, 'add-task-icon')}
          </div>
      </div>
    `;
  }
}

customElements.define('status-header', StatusHeader);
