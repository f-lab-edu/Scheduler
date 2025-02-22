import Header from '@/components/common/Header';
import Tabs from '@/components/Tabs';
import Contents from './components/Contents';
import { ITabTaskInfo } from 'types/types';

export class App {
  state: ITabTaskInfo;
  constructor() {
    this.state = {
      totalTaskCount: 0,
      tabName: 'Board',
    };
  }
  render(): string {
    const header = new Header().render();
    const tabs = new Tabs(['Board', 'Calendar']).render();
    console.log(tabs);
    const contents = new Contents(this.state.tabName, this.state.totalTaskCount).render();

    return `
      ${header}
      ${tabs}
      ${contents}
    `;
  }
}
