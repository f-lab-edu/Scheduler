import { TTab } from 'types/types';
import Tab from '@/components/tab/Tab';
export default class Tabs {
  tabs: TTab[];

  constructor(tabs: TTab[]) {
    this.tabs = tabs;
  }

  render(): string {
    const tabEl = this.tabs
      .map((tabName) => {
        const tab = new Tab(tabName);
        return tab.render();
      })
      .join('');

    return `
      <section class="tabs">
        ${tabEl}
      </section>
    `;
  }
}
