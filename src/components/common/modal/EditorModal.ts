import { createTextButton } from '@/utils/domButton';

export default class EiditorModal extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div>
        제작 예정

          <div class="submit-button-group">
                ${createTextButton('cancel-button', 'Cancel')}
                ${createTextButton('confirm-button', 'Save')}
          </div>
      <div>
    `;
  }
}

customElements.define('editor-modal', EiditorModal);
