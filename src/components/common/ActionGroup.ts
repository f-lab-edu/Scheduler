import '@/components/common/dropdown/PriorityList';
import { createIconTextButton } from '@/components/common/button/buttonTemplates';
import plus from '@/assets/plus.svg';
import search from '@/assets/search.svg';
import filter from '@/assets/funnel.svg';
export default class ActionGroup extends HTMLElement {
  private _totalCount: number;
  private showFilterList: boolean;
  // private _focusoutListenerAdded: boolean;

  constructor() {
    super();
    this._totalCount = 0;
    this.showFilterList = false;
    // this._focusoutListenerAdded = false;
  }

  connectedCallback() {
    this.render();

    this.setupAddButtonListener();
    this.setupFilterButtonListener();
    window.addEventListener('click', this.handleOutsideClick);
  }
  disconnectedCallback() {
    window.removeEventListener('click', this.handleOutsideClick);
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

  private setupAddButtonListener() {
    const $addNewButton = this.querySelector('.add-new-button');
    if ($addNewButton) {
      $addNewButton.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('add-new-clicked', { bubbles: true }));
      });
    }
  }

  private setupFilterButtonListener() {
    const $filterButton = this.querySelector('.filter-button');
    if ($filterButton) {
      $filterButton.addEventListener('click', (event: Event) => {
        this.showFilterList = !this.showFilterList; //true
        this.render();

        const $targetButton = event.currentTarget as HTMLButtonElement;
        console.log('🦊', $targetButton);
        // TODO: 체크하는 우선순위에 따라 TaskList에 보내서 필더할 데이터 복사 후 필더링 -> 체크된 거 없거나 다 체크되면 전체 리스트
      });
    }
  }

  private handleOutsideClick = (event: Event) => {
    const $target = event.target as HTMLElement;
    console.log('❌', $target.closest('.filter-button'));
    if (!this.showFilterList) {
      return;
    }

    if (!$target.closest('.filter-button')) {
      this.showFilterList = false;
      this.render();
    }
  };

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
                    <input value="" placeholder="Type your task" />
                </div>
               ${createIconTextButton('filter-button', filter, 'filter-icon', 'Filters')}
            </div>
        </section>
        ${this.showFilterList ? '<priority-list></priority-list>' : ''}
    `;
  }
}

customElements.define('action-group', ActionGroup);
