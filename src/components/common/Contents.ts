import './ActionGroup';
import '../borad/StatusList';
import StatusList from '../borad/StatusList';
import ActionGroup from './ActionGroup';
export default class Contents extends HTMLElement {
  selectedTab: string = 'Board';
  private isClickedAddStatus: boolean = false;
  private totalCount: number = 0;

  connectedCallback() {
    this.render();
    this.setEventListener();
    this.updateTotalTaskCount();
  }

  setEventListener() {
    this.addEventListener('add-new-clicked', () => {
      this.isClickedAddStatus = true;
      this.updateStatusList();
    });
  }

  updateStatusList() {
    const $statusList = this.querySelector('status-list') as StatusList;
    if ($statusList) {
      $statusList.isClickedAddStatus = this.isClickedAddStatus;
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

    const actionGroup = this.querySelector('action-group') as ActionGroup;
    if (actionGroup) {
      actionGroup.totalCount = total;
    }
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
