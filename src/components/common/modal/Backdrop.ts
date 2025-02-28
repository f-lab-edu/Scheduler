export default class Backdrop extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div>
            <slot></slot>
        </div>
    `;
  }
}

customElements.define('back-drop', Backdrop);
