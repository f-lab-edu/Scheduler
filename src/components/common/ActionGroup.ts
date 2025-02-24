import plus from '@/assets/plus.svg';
import search from '@/assets/search.svg';
import filter from '@/assets/funnel.svg';
import Button from './Button';

export default class ActionGroup {
  // actionWrapper: HTMLElement;

  render(): string {
    const plusBtn = new Button({
      buttonClass: 'add-new-button',
      imgSrc: plus,
      imgClass: 'plus-icon',
      text: 'Add New',
      onClick: () => console.log('Add New 버튼 클릭!'),
    }).render();

    const filterBtn = new Button({
      buttonClass: 'filter-button',
      imgSrc: filter,
      imgClass: 'filter-icon',
      text: 'Filters',
      onClick: () => console.log('Filters 버튼 클릭!'),
    }).render();

    return `
      <section class="action-group">
          <div class="left-actions">
              <div class="total-tasks">8 tasks</div>
              ${plusBtn}
          </div>
          <div class="right-actions">
              <div class="search-bar">
                  <img class="search-icon" src="${search}" alt="search icon" />
                  <input value="" placeholder="Type your search keyword" />
              </div>
              ${filterBtn}
          </div>
        </section>
    `;
  }
}
