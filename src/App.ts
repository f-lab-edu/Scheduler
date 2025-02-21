import Header from '@/components/common/Header';
import Tabs from '@/components/Tabs';
import Contents from './components/Contents';

export class App {
  render(): string {
    const header = new Header().render();
    const tabs = new Tabs(['Board', 'Calendar']).render();
    console.log(tabs);
    const contents = new Contents().render();

    return `
      ${header}
      ${tabs}
      ${contents}
    `;
  }
}
