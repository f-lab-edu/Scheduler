import { createTextButton } from '@/utils/domButton';
import plusIcon from '@/assets/plus.svg';

export default class AddStatusList extends HTMLElement {
  private _isClickedAddStatus: boolean = false;
  connectedCallback() {
    this.render();
  }

  get isClickedAddStatus() {
    return this._isClickedAddStatus;
  }

  set isClickedAddStatus(isClicked: boolean) {
    this._isClickedAddStatus = isClicked;
    this.render();
  }

  setEventListeners() {
    const $addButton = this.querySelector('.add-status');
    if ($addButton) {
      $addButton.addEventListener('click', () => {
        this._isClickedAddStatus = true;
        this.render();
      });
    }

    const $cancelButton = this.querySelector('.cancel-button');
    if ($cancelButton) {
      $cancelButton.addEventListener('click', () => {
        this._isClickedAddStatus = false;
        this.render();
      });
    }
  }

  render() {
    this.innerHTML = `
      <div class="add-status-list">
        ${
          this._isClickedAddStatus
            ? `
              <div class="input-button-group">
                <input class="status-input" value=""/>
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

    this.setEventListeners();
  }
}

customElements.define('add-status-list', AddStatusList);
