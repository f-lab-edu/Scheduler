export default class Agenda extends HTMLElement {
  connectedCallback() {
    this.render();
    this.loadStatus();
  }

  private loadStatus() {}

  render() {
    this.innerHTML = `
        <div class="agendar">
        </div>
    `;
  }
}

customElements.define('agenda-element', Agenda);
