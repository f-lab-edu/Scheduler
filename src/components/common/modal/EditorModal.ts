import { createIconButton, createTextButton } from '@/components/common/button/buttonTemplates';
import closeIcon from '@/assets/x.svg';
import calendarIcon from '@/assets/calendar-check.svg';
import { TPriorities } from 'types/types';

export default class EiditorModal extends HTMLElement {
  selectedPriority: string;
  constructor() {
    super();
    this.selectedPriority = 'high';
  }
  connectedCallback() {
    this.render();
    this.setupModalCancelButtonListener();
    this.setupSelectChangeListener();
  }

  private setupModalCancelButtonListener() {
    this.addEventListener('click', (event: Event) => {
      const $targetButton = event.target as HTMLElement;
      if ($targetButton) {
        const targetClass = $targetButton.className;

        if ($targetButton.closest('.cancel-button') || $targetButton.closest('.close-button')) {
          document.body.removeChild(this);
          return;
        }

        if (targetClass.includes('confirm-button')) {
          // TODO: title, start date, end date, priority, description 내용 task-list에 추가(indexedDB 사용)
        }
      }
    });
  }

  private setupSelectChangeListener() {
    const $select = this.querySelector('.select-box');
    if ($select) {
      $select.addEventListener('change', (event: Event) => {
        const $target = event.target as HTMLSelectElement;
        const priorityValue = $target.value;

        const $priorityColor = this.querySelector('.priority-color');
        if ($priorityColor) {
          $priorityColor.classList.remove('high', 'medium', 'low');
          $priorityColor.classList.add(priorityValue);
        }
      });
    }
  }

  render() {
    this.innerHTML = `
      <div class="backdrop">
          <div class="modal">
              <div class="modal-contents">
                  <header>
                      ${createIconButton('close-button', closeIcon, 'cancel-icon')}
                  </header>
                  <input class="editor-title" placeholder="New Title"/>

                  <div class="task-info-group">
                      <div class="calendar-wrapper">
                          <img class="calendar-icon" src="${calendarIcon}" alt="calendar icon"/>
                          <input class="date-input" type="date" placeholder="start"/>
                          <input class="date-input" type="date" placeholder="end"/>
                      </div>
                      <div class="priority-wrapper">
                          <span>priority</span>
                          <select class="select-box">
                              <option value="high">High</option>
                              <option value="medium">Medium</option>
                              <option value="low">Low</option>
                          </select>
                          <div class="priority-color high"></div>
                      </div>
                  </div>

                  <textarea class="description"></textarea>

                  <div class="submit-button-group">
                        ${createTextButton('cancel-button', 'Cancel')}
                        ${createTextButton('confirm-button', 'Save')}
                  </div>
              </div>
          </div>
      <div>
    `;
  }
}

customElements.define('editor-modal', EiditorModal);
