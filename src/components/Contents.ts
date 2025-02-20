import ActionGroup from './ActionGroup';
import StatusList from './StatusList';

export default class Contents {
  // taskList: IStatusList[];
  constructor() {
    // this.taskList.push(new StatusList());
  }
  render(): HTMLElement {
    const ContentsWrapper = document.createElement('section');
    ContentsWrapper.classList.add('contents');

    const actionGroup = new ActionGroup().render();
    // const taskList = new StatusList([]).render(); //데이터

    ContentsWrapper.appendChild(actionGroup);
    // ContentsWrapper.appendChild(taskList);

    return ContentsWrapper;
  }
}
