import { Tab as TabType } from '../../../types/types';
export default class Tab {
  selected: TabType;
  constructor(selected: TabType) {
    this.selected = selected;
  }

  render(): string {
    return `
      <button class="tab">
        ${this.selected}
      </button>
    `;
  }
}
