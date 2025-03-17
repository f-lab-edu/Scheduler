import '@/components/calendar/Calendar';
import '@/components/calendar/Agenda';

export default class CalendarContents extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="calendar-contents">
            <calendar-element></calendar-element>
            <agenda-element></agenda-element>
        </div>
    `;
  }
}

const isRegistered = customElements.get('calendar-contents');
if (!isRegistered) {
  customElements.define('calendar-contents', CalendarContents);
}
