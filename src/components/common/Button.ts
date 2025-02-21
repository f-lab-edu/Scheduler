import { IButton } from 'types/types';

export default class Button {
  button: HTMLButtonElement;
  constructor({ buttonClass = '', imgSrc = '', imgClass = '', text = '', onClick = () => {} }: IButton) {
    this.button = document.createElement('button');
    this.button.classList.add(buttonClass);

    if (imgSrc) {
      const img = document.createElement('img');
      img.classList.add(imgClass);
      img.src = imgSrc;
      this.button.appendChild(img);
    }
    if (text) {
      const $span = document.createElement('span');
      $span.textContent = text;
      this.button.appendChild($span);
    }

    this.button.addEventListener('click', onClick || (() => {}));
  }

  render(): HTMLElement {
    return this.button;
  }
}
