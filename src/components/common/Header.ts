export default class Header {
  render(): HTMLElement {
    const header = document.createElement('div');
    const logo = document.createElement('div');

    header.classList.add('header');

    logo.classList.add('logo');
    logo.textContent = 'Scheduler';
    header.appendChild(logo);

    return header;
  }
}
