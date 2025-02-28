export default class TextButton extends HTMLElement {
  buttonClass: string = '';
  private text: string = '';

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

customElements.define('text-button', TextButton);
