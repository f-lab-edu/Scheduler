import { TTab } from 'types/types';

export default class Tabs extends HTMLElement {
  private tabs: TTab[];
  private _selectedTab: string;

  constructor() {
    super();
    this.tabs = ['Board', 'Calendar'];
    this._selectedTab = '';
  }
  connectedCallback() {
    this.render();
    this.addEventListener('click', this.handleTabClick);
  }

  get selectedTab(): string {
    return this._selectedTab;
  }

  set selectedTab(value: string) {
    this._selectedTab = value;
    this.render();
  }

  private handleTabClick = (event: MouseEvent) => {
    const $target = event.target as HTMLElement;
    const $tabButton = $target.closest('.tab');
    if ($tabButton) {
      const tabName = $tabButton.textContent?.trim() || '';
      this.setActiveTab(tabName);
    }
  };

  private setActiveTab(tabName: string) {
    this.selectedTab = tabName;
    this.dispatchEvent(new CustomEvent('tab-change', { detail: tabName, bubbles: true }));
  }

  render() {
    this.innerHTML = `
        <section class="tabs">
            ${this.tabs
              .map(
                (tabName) => `
                    <button class="tab ${this.selectedTab === tabName ? 'active' : ''}">
                        <tab-element>${tabName}</tab-element>
                    </button>
                `,
              )
              .join('')}
        </section>
  `;
  }
}

const isRegistered = customElements.get('tabs-element');
if (!isRegistered) {
  customElements.define('tabs-element', Tabs);
}
