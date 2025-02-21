export default class Header {
  header: HTMLElement;
  logo: HTMLElement;
  constructor() {
    this.header = document.createElement('header');
    this.logo = document.createElement('div');

    this.header.classList.add('header');

    this.logo.classList.add('logo');
    this.logo.textContent = 'Scheduler';
    this.header.appendChild(this.logo);
  }
  render(): HTMLElement {
    return this.header;
  }
}
