import plus from '@/assets/plus.svg';
import search from '@/assets/search.svg';
import filter from '@/assets/funnel.svg';
import { createIconTextButton } from '@/components/common/button/buttonTemplates';
import '@/components/common/dropdown/PriorityList';
export default class ActionGroup extends HTMLElement {
  private _totalCount: number;
  private clickFilterButton: boolean;
  private selectedCalendar: boolean;

  constructor() {
    super();
    this._totalCount = 0;
    this.clickFilterButton = false;
    this.selectedCalendar = false;
  }

  connectedCallback() {
    this.render();
    this.setupButtonClickListener();
    this.setupInputChange();
  }

  static get observedAttributes() {
    return ['selected-tab'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'selected-tab' && oldValue !== newValue) {
      if (newValue === 'Calendar') {
        this.selectedCalendar = true;
        this.render();
      }
    }
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

  private setupInputChange() {
    const $searchInput = this.querySelector('.search-input') as HTMLInputElement;
    if (!$searchInput) return;

    let debounceTimer: number | undefined;
    const debounceDelay = 300;

    $searchInput.addEventListener('input', (event: Event) => {
      const $targetValue = (event.target as HTMLInputElement).value;

      // 디바운스 있으면
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      debounceTimer = window.setTimeout(() => {
        this.dispatchEvent(
          new CustomEvent('search-input-changed', {
            bubbles: true,
            detail: { targetValue: $targetValue },
          }),
        );
      }, debounceDelay);
    });
  }

  private render() {
    this.innerHTML = `
          <section class="action-group">
              <div class="left-actions">
                  <div class="total-tasks">${this._totalCount} tasks</div>
                  ${this.selectedCalendar ? '' : createIconTextButton('add-new-button', plus, 'plus-icon', 'Add New')}
              </div>
              <div class="right-actions">
                  <div class="search-bar">
                  <img class="search-icon" src="${search}" alt="search icon" />
                  <input class="search-input" value="" placeholder="Type your task" />
                  
                  </div>
                ${createIconTextButton('filter-button', filter, 'filter-icon', 'Filters')}
              </div>
          </section>
          <priority-list class="hidden"></priority-list>
      `;
  }
}

customElements.define('action-group', ActionGroup);
