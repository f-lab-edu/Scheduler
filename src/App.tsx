// /** @jsx createElement */
// import createElement from './utils/createElement';
// import Header from '@/components/common/Header';
// import Tabs from '@/components/tab/Tabs';
// import Contents from './components/Contents';
// import { ITabTaskInfo } from 'types/types';

// export default class App {
//   state: ITabTaskInfo;
//   constructor() {
//     this.state = {
//       totalTaskCount: 0,
//       tabName: 'Board',
//     };
//   }
//   // render(): string {
//   render(): string {
//     // const header = new Header().render();
//     const tabs = new Tabs(['Board', 'Calendar']).render();
//     const contents = new Contents(this.state.tabName, this.state.totalTaskCount).render();

//     // ${header}
//     // return `
//     //   ${tabs}
//     //   ${contents}
//     // `;

//     return <Header />;
//   }
// }

/** @jsx createElement */
import createElement from './utils/createElement';
import Header from '@/components/common/Header';
// import Tabs from '@/components/tab/Tabs';
// import Contents from './components/Contents';
import { ITabTaskInfo } from 'types/types';

export default class App {
  state: ITabTaskInfo;

  constructor() {
    this.state = {
      totalTaskCount: 0,
      tabName: 'Board',
    };
  }

  render(): HTMLElement {
    // const tabs = new Tabs(['Board', 'Calendar']).render();
    // const contents = new Contents(this.state.tabName, this.state.totalTaskCount).render();

    return (
      <div>
        <Header />
        {/* {tabs}
        {contents} */}
      </div>
    );
  }
}
