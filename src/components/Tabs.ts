import Tab from './common/Tab';

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
    this.innerHTML = '';
    const $section = document.createElement('section');
    $section.classList.add('tabs');

    this.tabs.forEach((tabName) => {
      const $tabButton = document.createElement('button');
      $tabButton.classList.add('tab');

      const $tabEl = document.createElement('tab-element') as Tab;
      $tabEl.setAttribute('selected', tabName);
      $tabEl.textContent = tabName;

      if (this.selectedTab === tabName) {
        $tabButton.classList.add('active');
      }

      $tabButton.addEventListener('click', () => {
        this.setActiveTab(tabName);
      });

      $tabButton.appendChild($tabEl);
      $section.appendChild($tabButton);
    });

    this.appendChild($section);
  }
  setActiveTab(tabName: string) {
    this.selectedTab = tabName;
    this.dispatchEvent(new CustomEvent('tab-change', { detail: tabName, bubbles: true }));
  }
}

customElements.define('tabs-element', Tabs);
