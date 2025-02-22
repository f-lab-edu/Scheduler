import { TStatusList } from 'types/types';
import Button from './common/Button';
import moreIcon from '@/assets/three-dots.svg';
import plusIcon from '@/assets/plus.svg';

export default class StatusHeader {
  status: TStatusList;
  count: number;
  constructor(status: TStatusList, count: number) {
    this.status = status;
    this.count = count;
  }

  add() {
    this.count += 1;
  }

  render() {
    const moreBtn = new Button({
      buttonClass: 'more-button',
      imgSrc: moreIcon,
      imgClass: 'more-icon',
      text: '',
      onClick: () => console.log('more 버튼 클릭!'),
    }).render();

    const plusBtn = new Button({
      buttonClass: 'add-task-button',
      imgSrc: plusIcon,
      imgClass: 'add-task-icon',
      text: '',
      onClick: () => this.add(),
    }).render();

    return `
      <div class="status-header">
          <div class="status-info">
              <h2 class="status">${this.status}</h2>
              <span class="task-count">${this.count}</span>
          </div>
          <div class="status-btns">
              ${moreBtn}
              ${plusBtn}
          </div>
      </div>
    `;
  }
}
