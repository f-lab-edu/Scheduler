import { createIconButton, createTextButton } from '@/components/common/button/buttonTemplates';
import closeIcon from '@/assets/x.svg';
import calendarIcon from '@/assets/calendar-check.svg';
import { TPriorities } from 'types/types';
import { createTask } from '@/data/indexedDBService';
import { createConfirmDialog } from './ModalTemplates';
import TaskList from '@/components/borad/TaskList';

export default class EiditorModal extends HTMLElement {
  selectedPriority: TPriorities;
  _title: string;
  _startDate: string;
  _endDate: string;
  _description: string;
  _showSaveButton: boolean;
  _statusId: string | null;

  constructor() {
    super();
    this.selectedPriority = 'high';
    this._title = '';
    this._startDate = '';
    this._endDate = '';
    this._description = '';
    this._showSaveButton = false;
    this._statusId = null;
  }
  connectedCallback() {
    this.render();
    this.setupModalButtonListener();
    this.setupSelectChangeListener();
    this.setupDescriptionListener();
  }

  set statusId(id: string) {
    this._statusId = id;
  }

  get statusId(): string | null {
    return this._statusId;
  }

  private setupModalButtonListener() {
    this.addEventListener('click', (event: Event) => {
      const $targetButton = event.target as HTMLElement;
      if ($targetButton) {
        const targetClass = $targetButton.className;

        if ($targetButton.closest('.cancel-button') || $targetButton.closest('.close-button')) {
          document.body.removeChild(this);
          return;
        }

        if (targetClass.includes('confirm-button')) {
          const taskData = {
            title: this._title,
            startDate: this._startDate,
            endDate: this._endDate,
            description: this._description,
            priority: this.selectedPriority,
            statusId: this._statusId,
          };

          if (!this._title || !this._startDate || !this._endDate) {
            const message = '제목, 시작날짜, 종료날짜는 필수값 입니다.';
            const confirmButtonText = '확인';
            const confirmHandler = () => {
              document.body.removeChild($alertDialog);
              return;
            };

            const $alertDialog = createConfirmDialog(message, confirmButtonText, confirmHandler);
            document.body.appendChild($alertDialog);
          } else {
            const message = '저장 하시겠습니까?';
            const confirmButtonText = '저장';
            const cancelButtonText = '취소';
            const confirmHandler = () => {
              createTask(taskData);

              const $taskList = document.querySelector(
                `ul.task-list[data-id="${taskData.statusId}"] task-list`,
              ) as TaskList;
              $taskList?.loadTasksByStatus();

              document.body.removeChild($confirmDialog);
              document.body.removeChild(this);
              return;
            };
            const cancelHandler = () => {
              document.body.removeChild($confirmDialog);
              return;
            };

            const $confirmDialog = createConfirmDialog(
              message,
              confirmButtonText,
              confirmHandler,
              cancelButtonText,
              cancelHandler,
            );
            document.body.appendChild($confirmDialog);
          }
        }
      }
    });

    this.addEventListener('input', (event: Event) => {
      const $inputTarget = event.target as HTMLInputElement;
      if ($inputTarget.closest('.editor-title')) {
        this._title = $inputTarget.value;
        return;
      }
      if ($inputTarget.closest('.start-date')) {
        this._startDate = $inputTarget.value;
        return;
      }
      if ($inputTarget.closest('.end-date')) {
        this._endDate = $inputTarget.value;
        return;
      }
    });
  }

  private setupDescriptionListener() {
    this.addEventListener('input', (event: Event) => {
      const $description = this.querySelector('.description');
      if ($description) {
        const $textareaTarget = event.target as HTMLInputElement;
        this._description = $textareaTarget.defaultValue;
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
          this.selectedPriority = priorityValue as TPriorities;
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
                  <input class="editor-title" value="" placeholder="New Title"/>

                  <div class="task-info-group">
                      <div class="calendar-wrapper">
                          <img class="calendar-icon" src="${calendarIcon}" alt="calendar icon"/>
                          <input class="date-input start-date" type="date" placeholder="start"/>
                          <input class="date-input end-date" type="date" placeholder="end"/>
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
