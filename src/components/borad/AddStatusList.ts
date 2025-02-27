import { createTextButton } from '@/utils/domButton';
import plusIcon from '@/assets/plus.svg';
import { TStatusList } from 'types/types';

export default class AddStatusList extends HTMLElement {
  private _isClickedAddStatus: boolean = false;
  private _newStatusTitle: TStatusList = '';

  connectedCallback() {
    this.render();
    this.setEventListeners();
  }

  get isClickedAddStatus() {
    return this._isClickedAddStatus;
  }

  set isClickedAddStatus(isClicked: boolean) {
    this._isClickedAddStatus = isClicked;
    this.render();
  }

  private setEventListeners() {
    this.addEventListener('click', (event) => {
      const $target = event.target as HTMLElement;

      if ($target.closest('.add-status')) {
        this._isClickedAddStatus = true;
        this._newStatusTitle = '';
        this.render();
      }

      if ($target.closest('.cancel-button')) {
        this._isClickedAddStatus = false;
        this.render();
      }

      if ($target.closest('.save-button')) {
        this._isClickedAddStatus = false;

        this.dispatchEvent(
          new CustomEvent('status-title-saved', { detail: { title: this._newStatusTitle }, bubbles: true }),
        );

        this.render();
      }
    });

    this.addEventListener('input', (event) => {
      const $inputTarget = event.target as HTMLInputElement;
      if ($inputTarget.classList.contains('status-input')) {
        this._newStatusTitle = $inputTarget.value;
      }
    });
  }

  render() {
    this.innerHTML = `
      <div class="add-status-list">
        ${
          this._isClickedAddStatus
            ? `
              <div class="input-button-group">
                <input class="status-input" value="${this._newStatusTitle}" />
                <div class="submit-button-group">
                  ${createTextButton('cancel-button', 'Cancel')}
                  ${createTextButton('save-button', 'Save')}
                </div>
              </div>
            `
            : `
              <button class="add-status">
                <img class="plus-icon" src="${plusIcon}" alt="button image" />
              </button>
            `
        }
      </div>
    `;
  }
}

customElements.define('add-status-list', AddStatusList);
