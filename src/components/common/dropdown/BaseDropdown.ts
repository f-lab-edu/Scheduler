export default class BaseDropdown extends HTMLElement {
  protected showList: boolean;

  constructor() {
    super();
    this.showList = false;
  }
  connectedCallback() {
    this.render();
    window.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback() {
    window.removeEventListener('click', this.handleOutsideClick);
  }

  private handleOutsideClick = (event: Event) => {
    if (!this.contains(event.target as HTMLElement) && this.showList) {
      this.showList = false;
      this.render();
    }
  };

  protected render() {}
}
