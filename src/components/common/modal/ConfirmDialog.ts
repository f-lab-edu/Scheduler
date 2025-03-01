import { createTextButton } from '@/components/common/button/buttonTemplates';

export default class ConfirmDialog extends HTMLElement {
  private message: string;
  private onConfirm?: () => void;
  private onCancel?: () => void;

  constructor() {
    super();
    this.message = '';
  }

  connectedCallback() {
    this.render();
    this.setEventLiteners();
  }

  set dialogMessage(message: string) {
    this.message = message;
    this.render();
  }

  set confirmHandler(handler: () => void) {
    this.onConfirm = handler;
  }

  set cancelHandler(handler: () => void) {
    this.onCancel = handler;
  }

  private setEventLiteners() {
    const $confirmButton = this.querySelector('.confirm-button');
    const $cancelButton = this.querySelector('.cancel-button');

    if ($confirmButton) {
      $confirmButton.addEventListener('click', () => {
        this.onConfirm?.();
      });
    }
    if ($cancelButton) {
      $cancelButton.addEventListener('click', () => {
        this.onCancel?.();
      });
    }
  }

  render() {
    this.innerHTML = `
    <div class="backdrop">
        <div class="modal"> 
            <p class="confirm-message">${this.message}</p>
            <div class="confirm-button-group">
                ${createTextButton('cancel-button', 'Cancel')}
                ${createTextButton('confirm-button', 'Delete')}
            </div>
        </div>
    </div>
    `;
  }
}

customElements.define('confirm-dialog', ConfirmDialog);
