export default class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <header class="header">
    <div class="logo">Scheduler</div>
    </header>
    `;
  }
}

const isRegistered = customElements.get('header-element');
if (!isRegistered) {
  customElements.define('header-element', Header);
}
