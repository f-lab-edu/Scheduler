import { createTextButton } from '@/utils/domButton';
import plusIcon from '@/assets/plus.svg';

export default class AddStatusList extends HTMLElement {
  private isClickedAddButton: boolean = false;
  connectedCallback() {
    this.render();
  }

  render() {
    //  <button>
    //           <img class="plus-icon" src="${plusIcon}" alt="button image" />
    //       </button>
    this.innerHTML = `
        <div class="add-status-list">
         
            <div class="input-button-group">
                <input class="status-input" value=""/>
                <div class='submit-button-group'>
                    ${createTextButton('cancel-button', 'Cancel')}
                    ${createTextButton('save-button', 'Save')}
                <div>
            </div>
        </div>
    `;
  }
}

customElements.define('add-status-list', AddStatusList);
