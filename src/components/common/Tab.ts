export default class Tab extends HTMLElement {
  private _selected?: string;

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['selected'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'selected') {
      this.selected = newValue;
    }
  }

  set selected(value: string) {
    this._selected = value;
    this.render();
  }

  get selected(): string | undefined {
    return this._selected;
  }

  connectedCallback() {
    if (this.hasAttribute('selected')) {
      this.selected = this.getAttribute('selected')!;
    }
    if (this._selected) {
      this.render();
    }
  }

  render() {
    if (!this._selected) {
      return;
    }

    this.innerHTML = `
      <button class="tab">${this._selected}</button>
    `;
  }
}

customElements.define('tab-element', Tab);
