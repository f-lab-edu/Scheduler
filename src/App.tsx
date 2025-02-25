/** @jsx createElement */
import createElement from './utils/createElement';
import Header from '@/components/common/Header';
import Tabs from './components/tab/Tabs';
import Contents from './components/Contents';
import { ITabTaskInfo, TTab } from 'types/types';

export default class App {
  state: ITabTaskInfo;
  tabs: TTab[];
  constructor() {
    this.tabs = ['Board', 'Calendar'];
    this.state = {
      totalTaskCount: 0,
      tabName: 'Board',
    };
  }

  render(): HTMLElement {
    return (
      <div>
        <Header />
        <Tabs tabs={this.tabs} />
        <Contents info={this.state} />
      </div>
    );
  }
}
