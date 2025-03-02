import plus from '@/assets/plus.svg';
import search from '@/assets/search.svg';
import filter from '@/assets/funnel.svg';
import { createIconTextButton } from '@/utils/domButton';
export default class ActionGroup extends HTMLElement {
  private count: string = '';
  connectedCallback() {
    const totalCount = this.getAttribute('total-count');
    if (totalCount) {
      this.count = totalCount;
    }

    this.render();
    this.setEventListener();
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
                <div class="total-tasks">8 tasks</div>
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
