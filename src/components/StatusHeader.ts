import { TStatusList } from 'types/types';
import moreIcon from '@/assets/three-dots.svg';
import plusIcon from '@/assets/plus.svg';
import './common/button/IconButton';

export default class StatusHeader extends HTMLElement {
  status: TStatusList = '';
  count: string = '0';
  connectedCallback() {
    const status = this.getAttribute('status');
    const count = this.getAttribute('count');
    if (status && count) {
      this.status = status;
      this.count = count;
    }
    this.render();
  }

  static get observedAttributes() {
    return ['status', 'count'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'selected-tab' && oldValue !== newValue) {
      this.render();
    }
  }

  private createIconButton(buttonClass: string, imgSrc: string, imgClass: string) {
    return `<icon-text-button button-class=${buttonClass} img-src="${imgSrc}" img-class=${imgClass}></icon-text-button>`;
  }

  render() {
    const status = this.getAttribute('status');
    const count = this.getAttribute('count');
    this.innerHTML = `
      <div class="status-header">
          <div class="status-info">
              <h2 class="status">${status}</h2>
              <span class="task-count">${count}</span>
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
