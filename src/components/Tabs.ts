import Tab from './common/Tab';

export default class Tabs extends HTMLElement {
  private tabs: string[] = [];

  static get observedAttributes() {
    return ['data-tabs'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'data-tabs') {
      this.tabs = newValue ? newValue.split(',') : [];
      this.render();
    }
  }

  connectedCallback() {
    const attr = this.getAttribute('data-tabs');
    if (attr) {
      this.tabs = attr.split(',');
    }

    this.render();
  }

  render() {
    this.innerHTML = '';
    const $section = document.createElement('section');
    $section.classList.add('tabs');

    this.tabs.forEach((tabName) => {
      const $tabButton = document.createElement('button');
      $tabButton.classList.add('tab');

      const tabEl = document.createElement('tab-element') as Tab;
      tabEl.setAttribute('selected', tabName);
      tabEl.textContent = tabName;

      $tabButton.appendChild(tabEl);
      $section.appendChild($tabButton);
    });

    this.appendChild($section);
  }
}

customElements.define('tabs-element', Tabs);
