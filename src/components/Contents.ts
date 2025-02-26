import { ICard, IStatusList, TTab } from 'types/types';
import ActionGroup from './ActionGroup';
import StatusList from './StatusList';
export default class Contents {
  connectedCallback() {}
}

// export default class Contents {
//   tab: TTab;
//   state: IStatusList[];

//   constructor(tab: TTab, totalTaskCount: number) {
//     this.tab = tab;
//     this.state = [{ listType: 'To do', taskCount: 0 }];
//   }

//   render(): string {
//     const actionGroup = new ActionGroup().render();
//     console.log(actionGroup);

//     const statusList = new StatusList(this.state).render();
//     // TODO: Board 개발 후
//     const calendar = '';

//     return `
//       <section class="contents">
//           ${actionGroup}
//           ${this.tab === 'Board' ? statusList : calendar}
//       </section>
//     `;
//   }
// }
