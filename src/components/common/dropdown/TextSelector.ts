export default class TextSelector extends HTMLElement {
  showList: boolean;
  constructor() {
    super();
    this.showList = false;
  }
  connectedCallback() {
    this.render();
    this.handleRemoveButtonClick();
    window.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback() {
    window.removeEventListener('click', this.handleOutsideClick);
  }

  private handleRemoveButtonClick() {
    const $removeItem = this.querySelector('.remove-item');
    if ($removeItem) {
      $removeItem.addEventListener('click', (event: Event) => {
        event.stopPropagation();
        $removeItem.dispatchEvent(new CustomEvent('remove-click', { bubbles: true }));
      });
    }
  }

  private handleOutsideClick = (event: Event) => {
    if (!this.contains(event.target as HTMLElement) && this.showList) {
      this.showList = false;
      this.render();
    }
  };

  render() {
    this.innerHTML = `
      <div class="dropdown-menu">
        <ul>
          <li class="remove-item">Remove list</li>
        </ul>
      </div>
    `;
  }
}

const isRegistered = customElements.get('text-selector');
if (!isRegistered) {
  customElements.define('text-selector', TextSelector);
}
