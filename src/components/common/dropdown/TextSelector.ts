import BaseDropdown from '@/components/common/dropdown/BaseDropdown';

export default class TextSelector extends BaseDropdown {
  connectedCallback() {
    this.render();
    this.handleRemoveButtonClick();
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

  // ${this.showList ? 'open' : 'closed'}
  protected render() {
    this.innerHTML = `
      <div class="dropdown-menu">
        <ul>
          <li class="remove-item">Remove list</li>
        </ul>
      </div>
    `;
  }
}

customElements.define('text-selector', TextSelector);
