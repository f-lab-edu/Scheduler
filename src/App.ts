import '@/components/common/Header';
import '@/components/Tabs';

export class App extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header-element></header-element>
      <tabs-element data-tabs="Board,Calendar"></tabs-element>
    `;
  }
}

customElements.define('app-root', App);
