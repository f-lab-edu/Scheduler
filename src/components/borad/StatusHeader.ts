import '@/components/common/dropdown/TextSelector';
import { createIconButton } from '@/utils/domButton';
import { TStatusList } from 'types/types';
import moreIcon from '@/assets/three-dots.svg';
import plusIcon from '@/assets/plus.svg';

export default class StatusHeader extends HTMLElement {
  private status: TStatusList = '';
  private taskCount: number = 0;
  private isShowMoreList: boolean = false;

  connectedCallback() {
    this.render();
    this.setEventLitener();
    window.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback() {
    window.removeEventListener('click', this.handleOutsideClick);
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

  // private handleMoreButtonClick() {
  //   this.addEventListener('click', () => {
  //     const $moreButton = this.querySelector('more-button');
  //     if ($moreButton) {
  //       $moreButton.dispatchEvent(new CustomEvent('status-more-click', { bubbles: true }));
  //     }
  //   });
  // }

  private handleOutsideClick = (event: Event) => {
    const $target = event.target as HTMLElement;
    if (!this.isShowMoreList) {
      return;
    }

    if (!$target.closest('.more-button')) {
      this.isShowMoreList = false;
      this.render();
    }
  };

  private setEventLitener() {
    this.addEventListener('click', (event: Event) => {
      const $target = event.target as HTMLElement;
      if ($target.closest('.more-button')) {
        this.isShowMoreList = !this.isShowMoreList;
        this.render();
        return;
      }
    });
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
      ${this.isShowMoreList ? `<text-selector></text-selector>` : ''}
    `;
  }
}

customElements.define('status-header', StatusHeader);
