import BaseDropdown from '@/components/common/dropdown/BasicDropdown';

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
  // render() {
  //   this.innerHTML = `
  //     <div class="dropdown-menu">
  //         <ul>
  //           <li class="remove-item">Remove list</li>
  //         </ul>
  //     </div>
  //   `;
  // }

  protected render() {
    this.innerHTML = `
      <div class="dropdown-menu ${this.showList ? 'open' : 'closed'}">
        <ul>
          <li class="remove-item">Remove list</li>
        </ul>
      </div>
    `;
    this.handleRemoveButtonClick();
  }
}

customElements.define('text-selector', TextSelector);
