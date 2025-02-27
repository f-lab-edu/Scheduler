import { TStatusList } from 'types/types';
import moreIcon from '@/assets/three-dots.svg';
import plusIcon from '@/assets/plus.svg';
import './common/button/IconButton';

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

  private createIconButton(buttonClass: string, imgSrc: string, imgClass: string) {
    return `<icon-text-button button-class=${buttonClass} img-src="${imgSrc}" img-class=${imgClass}></icon-text-button>`;
  }

  render() {
    this.innerHTML = `
      <div class="status-header">
          <div class="status-info">
              <h2 class="status">${this.columStatus}</h2>
              <span class="task-count">${this.count}</span>
          </div>  
          <div class="status-btns">
              ${this.createIconButton('more-button', moreIcon, 'more-icon')}
              ${this.createIconButton('add-task-button', plusIcon, 'add-task-icon')}
          </div>
      </div>
    `;
  }
}

customElements.define('status-header', StatusHeader);
