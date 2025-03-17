export default class IconButton extends HTMLElement {
  buttonClass: string;
  imgSrc: string;
  imgClass: string;
  constructor() {
    super();
    this.buttonClass = '';
    this.imgSrc = '';
    this.imgClass = '';
  }

  connectedCallback() {
    this.buttonClass = this.getAttribute('button-class') || '';
    this.imgSrc = this.getAttribute('img-src') || '';
    this.imgClass = this.getAttribute('img-class') || '';

    this.render();
  }

  render() {
    this.innerHTML = `
        <button class="${this.buttonClass}">
            <img class="${this.imgClass}" src="${this.imgSrc}" alt="button image" />
        </button>
    `;

    this.querySelector(`.${this.buttonClass}`)?.addEventListener('click', () => {
      this.dispatchEvent(new Event('button-click', { bubbles: true }));
    });
  }
}

const isRegistered = customElements.get('icon-button');
if (!isRegistered) {
  customElements.define('icon-button', IconButton);
}
