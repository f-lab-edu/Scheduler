import ActionGroup from './ActionGroup';

export default class Contents {
  constructor() {}
  render(): HTMLElement {
    const ContentsWrapper = document.createElement('section');
    ContentsWrapper.classList.add('contents');

    const actionGroup = new ActionGroup().render();
    // const taskList = new TaskList();

    ContentsWrapper.appendChild(actionGroup);

    return ContentsWrapper;
  }
}
