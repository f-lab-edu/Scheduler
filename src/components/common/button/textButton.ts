export default class TextButton extends HTMLElement {
  private buttonClass: string;
  private text: string;

  constructor() {
    super();
    this.buttonClass = '';
    this.text = '';
  }

  connectedCallback() {
    this.buttonClass = this.getAttribute('button-class') || '';
    this.text = this.getAttribute('text') || '';
    this.render();
  }

  render() {
    this.innerHTML = `
        <button class="text-button ${this.buttonClass}">
            ${this.text}
        </button>
    `;

    this.querySelector(`.${this.buttonClass}`)?.addEventListener('click', () => {
      this.dispatchEvent(new Event('button-click', { bubbles: true }));
    });
  }
}

const isRegistered = customElements.get('text-button');
if (!isRegistered) {
  customElements.define('text-button', TextButton);
}
