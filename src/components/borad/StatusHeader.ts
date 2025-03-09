import '@/components/common/dropdown/TextSelector';
import '@/components/common/modal/ConfirmDialog';
import '@/components/common/modal/EditorModal';
import EiditorModal from '@/components/common/modal/EditorModal';
import { createIconButton } from '@/components/common/button/buttonTemplates';
import moreIcon from '@/assets/three-dots.svg';
import plusIcon from '@/assets/plus.svg';

export default class StatusHeader extends HTMLElement {
  private status: string;
  private taskCount: number;
  private isShowMoreList: boolean;

  constructor() {
    super();
    this.status = '';
    this.taskCount = 0;
    this.isShowMoreList = false;
  }

  connectedCallback() {
    this.render();
    this.setupButtonClickListeners();
    window.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback() {
    window.removeEventListener('click', this.handleOutsideClick);
  }

  get statusTitle() {
    return this.status;
  }

  set statusTitle(newTitle: string) {
    this.status = newTitle;
    this.render();
  }

  get count() {
    return this.taskCount;
  }

  set count(count: number) {
    this.taskCount = count;
    this.render();
  }

  private handleOutsideClick = (event: Event) => {
    const $target = event.target as HTMLElement;
    if (!this.isShowMoreList) {
      return;
    }

    if (!$target.closest('.more-button')) {
      this.isShowMoreList = false;
      this.render();
    }
  };

  private setupButtonClickListeners() {
    this.addEventListener('click', (event: Event) => {
      const $target = event.target as HTMLElement;
      const $editorModal = document.createElement('editor-modal') as EiditorModal;

      if ($target.closest('.more-button')) {
        this.isShowMoreList = !this.isShowMoreList;
        this.render();
        return;
      }

      if ($target.closest('.add-task-button')) {
        const $taskList = this.closest('ul.task-list');
        if (!$taskList) {
          return;
        }

        const statusId = $taskList.getAttribute('data-id');

        if (statusId) {
          $editorModal.statusId = statusId;
        }

        document.body.appendChild($editorModal);
        this.render();
      }
    });
  }

  render() {
    this.innerHTML = `
      <div class="status-header">
          <div class="status-info">
              <h2 class="status">${this.statusTitle}</h2>
              <span class="task-count">${this.taskCount}</span>
          </div>  
          <div class="status-btns">
              ${createIconButton('more-button', moreIcon, 'more-icon')}
              ${createIconButton('add-task-button', plusIcon, 'add-task-icon')}
          </div>
      </div>
      ${this.isShowMoreList ? `<text-selector></text-selector>` : ''}
      `;
  }
}

customElements.define('status-header', StatusHeader);
