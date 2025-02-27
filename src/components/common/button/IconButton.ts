export default class IconButton extends HTMLElement {
  buttonClass: string = '';
  imgSrc: string = '';
  imgClass: string = '';

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

    this.querySelector('button')?.addEventListener('click', () => {
      this.dispatchEvent(new Event('button-click'));
    });
  }
}

customElements.define('icon-button', IconButton);
