import { Tab as TabType } from 'types/types';
import Tab from '@/components/common/Tab';
export default class Tabs {
  tabs: TabType[];

  constructor($tabs: TabType[]) {
    this.tabs = $tabs;
  }

  render(): HTMLElement {
    const tabContainer = document.createElement('section');
    tabContainer.classList.add('tabs');

    this.tabs.forEach((tabName) => {
      const tab = new Tab(tabName);
      tabContainer.appendChild(tab.render());
    });

    return tabContainer;
  }
}
