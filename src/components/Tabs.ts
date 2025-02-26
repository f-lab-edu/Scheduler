export default class Tabs extends HTMLElement {
  private tabs: string[] = [];
  public _selectedTab: string = '';

  connectedCallback() {
    const attr = this.getAttribute('data-tabs');
    if (attr) {
      this.tabs = attr.split(',');
    }

    this.render();
  }

  get selectedTab(): string {
    return this._selectedTab;
  }

  set selectedTab(value: string) {
    this._selectedTab = value;
    this.render();
  }
  render() {
    this.innerHTML = `
    <section class="tabs">
      ${this.tabs
        .map(
          (tabName) => `
          <button class="tab ${this.selectedTab === tabName ? 'active' : ''}">
            <tab-element selected="${tabName}">${tabName}</tab-element>
          </button>
        `,
        )
        .join('')}
    </section>
  `;

    this.querySelectorAll('.tab').forEach(($tabButton) => {
      $tabButton.addEventListener('click', () => {
        const tabName = $tabButton.textContent?.trim() || '';
        this.setActiveTab(tabName);
      });
    });
  }

  setActiveTab(tabName: string) {
    this.selectedTab = tabName;
    this.dispatchEvent(new CustomEvent('tab-change', { detail: tabName, bubbles: true }));
  }
}

customElements.define('tabs-element', Tabs);
