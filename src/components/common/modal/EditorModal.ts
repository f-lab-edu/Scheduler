import { createTextButton } from '@/components/common/button/buttonTemplates';

export default class EiditorModal extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setEventListener();
  }

  private setEventListener() {
    this.addEventListener('click', (event: Event) => {
      const $targetButton = event.target as HTMLElement;
      if ($targetButton) {
        const targetClass = $targetButton.className;
        if (targetClass.includes('cancel-button')) {
          document.body.removeChild(this);
        }
      }
    });
  }

  render() {
    this.innerHTML = `
      <div class="backdrop">
          <div class="modal">
              제작 예정

                <div class="submit-button-group">
                      ${createTextButton('cancel-button', 'Cancel')}
                      ${createTextButton('confirm-button', 'Save')}
                </div>
          </div>
      <div>
    `;
  }
}

customElements.define('editor-modal', EiditorModal);
