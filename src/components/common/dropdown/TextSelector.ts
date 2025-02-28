export default class TextSelector extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
      <div class="dropdown-menu">
          <ul>
            <li>Remove list</li>
          </ul>
      </div>
    `;
  }
}

customElements.define('text-selector', TextSelector);
