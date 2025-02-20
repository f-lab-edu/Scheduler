import { Tab as TabType } from '../../../types/types';
export default class Tab {
  selected: TabType;
  constructor($selected: TabType) {
    this.selected = $selected;
  }

  render(): HTMLElement {
    const tab = document.createElement('button');
    tab.classList.add('tab');
    tab.textContent = this.selected;

    return tab;
  }
}
