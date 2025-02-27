import plus from '@/assets/plus.svg';
import search from '@/assets/search.svg';
import filter from '@/assets/funnel.svg';
import { createIconTextButton } from '@/utils/domButton';
export default class ActionGroup extends HTMLElement {
  private _totalCount: number = 0;

  connectedCallback() {
    this.render();
    this.setEventListener();
  }

  get totalCount() {
    return this._totalCount;
  }

  set totalCount(count: number) {
    this._totalCount = count;
    this.render();
  }

  setEventListener() {
    const $addNewButton = this.querySelector('.add-new-button');
    if ($addNewButton) {
      $addNewButton.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('add-new-clicked', { bubbles: true }));
      });
    }
  }

  render() {
    this.innerHTML = `
        <section class="action-group">
            <div class="left-actions">
                <div class="total-tasks">${this._totalCount} tasks</div>
                ${createIconTextButton('add-new-button', plus, 'plus-icon', 'Add New')}
            </div>
            <div class="right-actions">
                <div class="search-bar">
                    <img class="search-icon" src="${search}" alt="search icon" />
                    <input value="" placeholder="Type your search keyword" />
                </div>
               ${createIconTextButton('filter-button', filter, 'filter-icon', 'Filters')}
            </div>
        </section>
    `;
  }
}

customElements.define('action-group', ActionGroup);
