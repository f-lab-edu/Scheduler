import { TTab } from '../../../types/types';
export default class Tab {
  selected: TTab;
  constructor(selected: TTab) {
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
