import ActionGroup from './ActionGroup';

export default class Contents {
  render(): string {
    const actionGroup = new ActionGroup().render();
    console.log(actionGroup);

    return `
      <section class="contents">
        ${actionGroup}
      </section>
    `;
  }
}
