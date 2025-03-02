import '@/components/common/ActionGroup';
import '@/components/borad/StatusList';
import StatusList from '@/components/borad/StatusList';
import ActionGroup from '@/components/common/ActionGroup';
import ConfirmDialog from '@/components/common/modal/ConfirmDialog';
export default class Contents extends HTMLElement {
  private selectedTab: string;
  private clickedAddStatus: boolean;

  constructor() {
    super();
    this.selectedTab = 'Board';
    this.clickedAddStatus = false;
  }

  connectedCallback() {
    this.render();
    this.handleAddNewButtonClick();
    this.updateTotalTaskCount();
    this.setupRemoveConfirmationHandler();
  }

  handleAddNewButtonClick() {
    this.addEventListener('add-new-clicked', () => {
      this.clickedAddStatus = true;
      this.createNewStatus();
    });
  }

  createNewStatus() {
    const $statusList = this.querySelector('status-list') as StatusList;
    if ($statusList) {
      $statusList.clickedAddStatus = this.clickedAddStatus;
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
      const $dialog = document.createElement('confirm-dialog') as ConfirmDialog;

      $dialog.dialogMessage = '모든 하위 일정이 삭제 됩니다. </br> 삭제하시겠습니까?';
      $dialog.cancelHandler = () => {
        document.body.removeChild($dialog);
      };
      $dialog.confirmHandler = () => {
        document.body.removeChild($dialog);
        const $statusList = this.querySelector('status-list') as HTMLElement;

        if ($statusList) {
          const $targetButton = event.target as HTMLElement;
          const $taskList = $targetButton.closest('ul.task-list');

          if ($taskList) {
            $taskList.remove();
          }
        }
      };

      document.body.appendChild($dialog);
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
