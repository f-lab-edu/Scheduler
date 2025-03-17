import IconButton from '@/components/common/button/IconButton';

export default class IconTextButton extends IconButton {
  private text: string;

  constructor() {
    super();
    this.text = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.text = this.getAttribute('text') || '';
    this.render();
  }

  render() {
    this.innerHTML = `
        <button class="${this.buttonClass}">
            <img class="${this.imgClass}" src="${this.imgSrc}" alt="button image" />
            <span>${this.text}</span>
        </button>
    `;

    this.querySelector(`.${this.buttonClass}`)?.addEventListener('click', () => {
      this.dispatchEvent(new Event('button-click', { bubbles: true }));
    });
  }
}

const isRegistered = customElements.get('icon-text-button');
if (!isRegistered) {
  customElements.define('icon-text-button', IconTextButton);
}
