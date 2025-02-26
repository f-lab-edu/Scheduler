import '@/components/common/Header';
import '@/components/Tabs';
import Tabs from '@/components/Tabs';
import Contents from './components/Contents';
import { TTab } from 'types/types';

export class App extends HTMLElement {
  private selectedTab: TTab = 'Board';
  connectedCallback() {
    this.innerHTML = `
      <header-element></header-element>
      <tabs-element data-tabs="Board,Calendar"></tabs-element>
    `;

    const $tabsEl = this.querySelector('tabs-element') as Tabs;
    // const $contentsEl = this.querySelector('contents-element') as Contents;

    if ($tabsEl) {
      $tabsEl.selectedTab = this.selectedTab;

      $tabsEl.addEventListener('tab-change', (event: Event) => {
        const newTab = (event as CustomEvent).detail;
        console.log('✅', event);
        this.selectedTab = newTab;
        //  contentsElement.setAttribute('content', newTab);
      });
    }
  }
}

customElements.define('app-root', App);
