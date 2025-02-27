import '@/components/common/Header';
import '@/components/Tabs';
import '@/components/Contents';
import Tabs from './components/Tabs';
import Contents from './components/Contents';
import { TTab } from '../types/types';

export class App extends HTMLElement {
  private selectedTab: TTab = 'Board';

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  private addEventListeners() {
    const $tabs = this.querySelector('tabs-element') as Tabs;
    const $contents = this.querySelector('contents-element') as Contents;

    if ($tabs && $contents) {
      $tabs.selectedTab = this.selectedTab;

      $tabs.addEventListener('tab-change', (event: Event) => {
        const newTab = (event as CustomEvent).detail;
        this.handleTabChange(newTab, $contents);
      });
    }
  }

  private handleTabChange(newTab: TTab, $contents: Contents) {
    this.selectedTab = newTab;
    $contents.setAttribute('selected-tab', newTab);
  }

  private render() {
    this.innerHTML = `
        <header-element></header-element>
        <tabs-element data-tabs="Board,Calendar"></tabs-element>
        <contents-element selected-tab="${this.selectedTab}"></contents-element>
    `;
  }
}

customElements.define('app-root', App);
