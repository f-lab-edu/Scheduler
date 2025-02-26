export default class Contents extends HTMLElement {
  public selectedTab: string = 'Board';

  connectedCallback() {
    this.render();
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
            ${selectedTab === 'Board' ? '<status-list>상태</status-list>' : '<calendar>캘린더</calendar>'}
        </section>
        
        `;
  }
}

customElements.define('contents-element', Contents);
