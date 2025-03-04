import '@/components/common/ActionGroup';
import '@/components/borad/StatusList';
import StatusList from '@/components/borad/StatusList';
import ActionGroup from '@/components/common/ActionGroup';
import { deleteStatus } from '@/data/indexedDBService';
import { createConfirmDialog } from './modal/ModalTemplates';
export default class Contents extends HTMLElement {
  private selectedTab: string;
  private addClicked: boolean;

  constructor() {
    super();
    this.selectedTab = 'Board';
    this.addClicked = false;
  }

  async connectedCallback() {
    this.render();
    this.handleAddNewButtonClick();
    this.updateTotalTaskCount();
    this.setupRemoveConfirmationHandler();
  }

  handleAddNewButtonClick() {
    this.addEventListener('add-new-clicked', () => {
      this.addClicked = true;
      this.createNewStatus();
    });
  }

  createNewStatus() {
    const $statusList = this.querySelector('status-list') as StatusList;
    if ($statusList) {
      $statusList.addClicked = this.addClicked;
    }
  }

  static get observedAttributes() {
    return ['selected-tab'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'selected-tab' && oldValue !== newValue) {
      this.render();
    }
  }

  private updateTotalTaskCount() {
    let total = 0;
    const $statusLists = this.querySelectorAll('status-list') as NodeListOf<StatusList>;
    $statusLists.forEach((list) => {
      total += list.totalTaskCount;
    });

    const $actionGroup = this.querySelector('action-group') as ActionGroup;
    if ($actionGroup) {
      $actionGroup.totalCount = total;
    }
  }

  private setupRemoveConfirmationHandler() {
    this.addEventListener('remove-click', (event: Event) => {
      const message = '모든 하위 일정이 삭제 됩니다. </br> 삭제하시겠습니까?';
      const confirmButtonText = '삭제';
      const cancelButtonText = '취소';
      const cancelHandler = () => {
        document.body.removeChild($confirmDialog);
      };
      const confirmHandler = () => {
        document.body.removeChild($confirmDialog);
        const $statusList = this.querySelector('status-list') as HTMLElement;

        if ($statusList) {
          const $targetButton = event.target as HTMLElement;
          const $taskList = $targetButton.closest('ul.task-list') as HTMLUListElement | null;

          if ($taskList) {
            deleteStatus(Number($taskList.dataset.id));
            $taskList.remove();
            this.updateTotalTaskCount();
          }
        }
      };
      const $confirmDialog = createConfirmDialog(
        message,
        confirmButtonText,
        confirmHandler,
        cancelButtonText,
        cancelHandler,
      );
      document.body.appendChild($confirmDialog);
    });
  }

  render() {
    const selectedTab = this.getAttribute('selected-tab') || 'Board';
    this.innerHTML = `
        <section class="contents">
            <action-group></action-group>
            ${selectedTab === 'Board' ? '<status-list></status-list>' : '<calendar>캘린더</calendar>'}
        </section>
    `;
  }
}

customElements.define('contents-element', Contents);
