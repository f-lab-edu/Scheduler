import { createTextButton } from '@/components/common/button/buttonTemplates';
import plusIcon from '@/assets/plus.svg';
import { createStatus } from '@/data/indexedDBService';

export default class AddStatusList extends HTMLElement {
  private _addClicked: boolean;
  private _newStatusTitle: string;

  constructor() {
    super();
    this._addClicked = false;
    this._newStatusTitle = '';
  }

  connectedCallback() {
    this.render();
    this.setupStatusEventListeners();
  }

  get clickedAddStatus() {
    return this._addClicked;
  }

  set clickedAddStatus(isClicked: boolean) {
    this._addClicked = isClicked;
    this.render();
  }

  private setupStatusEventListeners() {
    this.addEventListener('click', (event) => {
      const $target = event.target as HTMLElement;

      if ($target.closest('.add-status')) {
        this._addClicked = true;
        this._newStatusTitle = '';
        this.render();
      }

      if ($target.closest('.cancel-button')) {
        this._addClicked = false;
        this.render();
      }

      if ($target.closest('.confirm-button')) {
        if (this._newStatusTitle === '') {
          // TODO: 공통 alert 생성
          alert('빈 값으로 저장 불가');
          return;
        }
        this._addClicked = false;

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
          this._addClicked
            ? `
              <div class="input-button-group">
                <input class="status-input" value="${this._newStatusTitle}" />
                <div class="submit-button-group">
                  ${createTextButton('cancel-button', 'Cancel')}
                  ${createTextButton('confirm-button', 'Save')}
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
