import plus from '@/assets/plus.svg';
import search from '@/assets/search.svg';
import filter from '@/assets/funnel.svg';
import Button from './common/Button';

export default class ActionGroup {
  actionWrapper: HTMLElement;
  constructor() {
    this.actionWrapper = document.createElement('section');
    this.actionWrapper.classList.add('action-group');

    this.actionWrapper.innerHTML = `
        <div class="left-actions">
            <div class="total-tasks">8 tasks</div>
        </div>
        <div class="right-actions">
            <div class="search-bar">
                <img class="search-icon" src="${search}" alt="search icon" />
                <input value="" placeholder="Type your search keyword" />
            </div>
        </div>
    `;

    const leftAction = this.actionWrapper.querySelector('.left-actions');
    leftAction?.appendChild(
      new Button({
        buttonClass: 'add-new-button',
        imgSrc: plus,
        imgClass: 'plus-icon',
        text: 'Add New',
        onClick: () => console.log('Add New 버튼 클릭!'),
      }).render(),
    );

    const rightAction = this.actionWrapper.querySelector('.right-actions');
    rightAction?.appendChild(
      new Button({
        buttonClass: 'filter-button',
        imgSrc: filter,
        imgClass: 'filter-icon',
        text: 'Filters',
        onClick: () => console.log('Filters 버튼 클릭!'),
      }).render(),
    );
  }

  render(): HTMLElement {
    return this.actionWrapper;
  }
}
