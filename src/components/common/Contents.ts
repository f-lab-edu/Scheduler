import './ActionGroup';
import '../borad/StatusList';
import StatusList from '../borad/StatusList';
export default class Contents extends HTMLElement {
  selectedTab: string = 'Board';
  private isClickedAddStatus: boolean = false;

  connectedCallback() {
    this.render();
    this.setEventListener();
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

  render() {
    const selectedTab = this.getAttribute('selected-tab') || 'Board';
    this.innerHTML = `
        <section class="contents">
            <action-group></action-group>
            ${selectedTab === 'Board' ? '<status-list></status-list>' : '<calendar>캘린더</calendar>'}
        </section>
        
        `;
    this.updateStatusList();
  }
}

customElements.define('contents-element', Contents);
