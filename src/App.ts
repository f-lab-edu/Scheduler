import '@/components/common/Header';
import '@/components/Tabs';
import '@/components/Contents';
import Tabs from '@/components/Tabs';
import Contents from './components/Contents';
import { TTab } from 'types/types';

export class App extends HTMLElement {
  private selectedTab: TTab = 'Board';

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  private addEventListeners() {
    const $tabsEl = this.querySelector('tabs-element') as Tabs;
    const $contentsEl = this.querySelector('contents-element') as Contents;

    if ($tabsEl && $contentsEl) {
      $tabsEl.selectedTab = this.selectedTab;

      $tabsEl.addEventListener('tab-change', (event: Event) => {
        const newTab = (event as CustomEvent).detail;
        this.handleTabChange(newTab, $contentsEl);
      });
    }
  }

  private handleTabChange(newTab: TTab, $contentsEl: Contents) {
    this.selectedTab = newTab;
    $contentsEl.setAttribute('selected-tab', newTab);
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
