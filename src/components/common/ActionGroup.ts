import plus from '@/assets/plus.svg';
import search from '@/assets/search.svg';
import filter from '@/assets/funnel.svg';
import { createIconTextButton } from '@/components/common/button/buttonTemplates';
import '@/components/common/dropdown/PriorityList';
export default class ActionGroup extends HTMLElement {
  private _totalCount: number;
  private clickFilterButton: boolean;
  private showList: boolean;

  constructor() {
    super();
    this._totalCount = 0;
    this.clickFilterButton = false;
    this.showList = false;
  }

  connectedCallback() {
    this.render();

    this.setupButtonClickListener();
  }

  get totalCount() {
    return this._totalCount;
  }

  set totalCount(count: number) {
    this._totalCount = count;
    this.updateTotalCount();
  }

  private updateTotalCount() {
    const $totalCount = this.querySelector('.total-tasks');
    if ($totalCount) {
      $totalCount.textContent = `${this._totalCount} tasks`;
    }
  }

  private setupButtonClickListener() {
    const $addNewButton = this.querySelector('.add-new-button');
    if ($addNewButton) {
      $addNewButton.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('add-new-clicked', { bubbles: true }));
      });
    }

    const $filterButton = this.querySelector('.filter-button');
    if ($filterButton) {
      $filterButton.addEventListener('click', this.handleFilterButtonClick);

      window.addEventListener('click', this.handleOutsideClick);
    }
  }

  private handleFilterButtonClick = (event: Event) => {
    event.stopPropagation();
    const $priorityList = this.querySelector('priority-list');
    if (!$priorityList) {
      return;
    }
    $priorityList.classList.toggle('hidden');
    this.clickFilterButton = !$priorityList.classList.contains('hidden');
  };

  private handleOutsideClick = (event: Event) => {
    const $target = event.target as HTMLElement;
    if ($target.closest('.filter-button') || $target.closest('priority-list')) {
      return;
    }

    const $priorityList = this.querySelector('priority-list');
    if ($priorityList) {
      $priorityList.classList.add('hidden');
    }
    this.clickFilterButton = false;
  };

  private render() {
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
          <priority-list class="hidden"></priority-list>
      `;
  }
}

customElements.define('action-group', ActionGroup);
