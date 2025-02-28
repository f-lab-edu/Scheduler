import { TTab } from 'types/types';

export default class Tabs extends HTMLElement {
  private tabs: TTab[] = ['Board', 'Calendar'];
  _selectedTab: string = '';

  connectedCallback() {
    this.render();
  }

  get selectedTab(): string {
    return this._selectedTab;
  }

  set selectedTab(value: string) {
    this._selectedTab = value;
    this.render();
  }

  private setEventListeners() {
    this.querySelectorAll('.tab').forEach(($tabButton) => {
      $tabButton.addEventListener('click', () => {
        const tabName = $tabButton.textContent?.trim() || '';
        this.setActiveTab(tabName);
      });
    });
  }

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

    this.setEventListeners();
  }
}

customElements.define('tabs-element', Tabs);
