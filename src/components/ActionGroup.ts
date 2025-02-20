import plus from '@/assets/plus-lg.svg';
import search from '@/assets/search.svg';
import filter from '@/assets/funnel.svg';

export default class ActionGroup {
  render(): HTMLElement {
    const actionWrapper = document.createElement('section');
    actionWrapper.classList.add('action-group');

    actionWrapper.innerHTML = `
       <div class="left-action">
            <div class="total-tasks">8 tasks</div>
            <button class="add-new-button">
              <img class="plus-icon" alt="plus button" />
              <div>Add New</div>
            </button>
          </div>
          <div class="right-actions">
            <div class="search-bar">
              <img class="search-icon" alt="search icon" />
              <input value="" placeholder="Type your search keyword" />
            </div>
            <button class="filter-button">
              <img class="filter-icon" alt="filter icon" />
              <div>Filters</div>
            </button>
          </div>
    `;

    const plusIcon = actionWrapper.querySelector('.plus-icon') as HTMLImageElement;
    const searchIcon = actionWrapper.querySelector('.search-icon') as HTMLImageElement;
    const filterIcon = actionWrapper.querySelector('.filter-icon') as HTMLImageElement;

    if (plusIcon) plusIcon.src = plus;
    if (searchIcon) searchIcon.src = search;
    if (filterIcon) filterIcon.src = filter;

    return actionWrapper;
  }
}
