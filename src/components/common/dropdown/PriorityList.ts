export default class PriorityList extends HTMLElement {
  connectedCallback() {
    this.render();
    this.handleFilterPriorityClick();
  }

  private handleFilterPriorityClick() {
    const $priorityList = this.querySelector('.priority-list');
    if ($priorityList) {
      $priorityList.addEventListener('click', (event: Event) => {
        event.stopPropagation();
        $priorityList.dispatchEvent(new CustomEvent('pritority-check', { bubbles: true }));
      });
    }
  }
  render() {
    this.innerHTML = `
      <div class="dropdown-menu">
          <ul class="priority-list">
              <li>
                  <div class="priority-check-wrapper">
                      <input type="checkbox"/>
                      <span>High priority</span>
                  </div>
                  <div class="priority-check-wrapper">
                      <input type="checkbox"/>
                      <span>Medium priority</span>
                  </div>
                  <div class="priority-check-wrapper">
                      <input type="checkbox"/>
                      <span>Low priority</span>
                  </div>
              </li>
          </ul>
      </div>
    `;
  }
}

customElements.define('priority-list', PriorityList);
