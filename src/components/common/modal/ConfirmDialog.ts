import { createTextButton } from '@/components/common/button/buttonTemplates';

export default class ConfirmDialog extends HTMLElement {
  private message: string;
  private confirmText: string;
  private cancelText?: string;
  private onConfirm?: () => void;
  private onCancel?: () => void;

  constructor() {
    super();
    this.message = '';
    this.confirmText = 'delete';
  }

  connectedCallback() {
    this.render();
    this.setupModalButtonListeners();
  }

  set dialogMessage(message: string) {
    this.message = message;
    this.render();
  }

  set dialogConfirmText(text: string) {
    this.confirmText = text;
    this.render();
  }
  set dialogCancelText(text: string) {
    this.cancelText = text;
    this.render();
  }

  set confirmHandler(handler: () => void) {
    this.onConfirm = handler;
  }

  set cancelHandler(handler: () => void) {
    this.onCancel = handler;
  }

  private setupModalButtonListeners() {
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
                ${this.cancelText ? createTextButton('cancel-button', this.cancelText) : ''}
                ${createTextButton('confirm-button', this.confirmText)}
            </div>
        </div>
    </div>
    `;
  }
}

customElements.define('confirm-dialog', ConfirmDialog);
