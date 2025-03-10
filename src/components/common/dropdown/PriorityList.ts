export default class PriorityList extends HTMLElement {
  connectedCallback() {
    this.render();
    this.handleFilterPriorityClick();
    this.setupCheckboxListeners();
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

  private setupCheckboxListeners() {
    const $priorityList = this.querySelector('.priority-list');
    if ($priorityList) {
      $priorityList.addEventListener('change', (event: Event) => {
        const $high = (this.querySelector('#high') as HTMLInputElement).checked;
        const $medium = (this.querySelector('#medium') as HTMLInputElement).checked;
        const $low = (this.querySelector('#low') as HTMLInputElement).checked;

        const selectedPriorities = [];
        if ($high) selectedPriorities.push('high');
        if ($medium) selectedPriorities.push('medium');
        if ($low) selectedPriorities.push('low');

        this.dispatchEvent(new CustomEvent('priority-changed', { detail: { selectedPriorities }, bubbles: true }));
      });
    }
  }
  protected render() {
    this.innerHTML = `
      <div class="filter-dropdown">
          <div>Priorities</div>
          <hr/>
          <ul class="priority-list">
              <li>
                <div class="priority-check-wrapper">
                  <input type="checkbox" id="high"/>
                  <label for="high">High priority</label>
                </div>
                <div class="priority-check-wrapper">
                  <input type="checkbox"id="medium"/>
                  <label for="medium">Medium priority</label>
                </div>
                <div class="priority-check-wrapper">
                  <input type="checkbox"id="low"/>
                  <label for="low">Low priority</label>
                </div>
              </li>
            </ul>
      </div>
    `;
    this.handleFilterPriorityClick();
  }
}

customElements.define('priority-list', PriorityList);
