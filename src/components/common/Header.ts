// export default class Header {
//   render(): string {
//     return `
//       <header class="header">
//         <div class="logo">Scheduler</div>
//       </header>
//     `;
//   }
// }
export default class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <header class="header">
            <div class="logo">Scheduler</div>
        </header>
    `;
  }
}

customElements.define('header-element', Header);
