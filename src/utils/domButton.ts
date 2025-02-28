import '@/components/common/button/textButton';
import '@/components/common/button/IconButton';
import '@/components/common/button/IconTextButton';

export function createIconButton(buttonClass: string, imgSrc: string, imgClass: string) {
  return `
      <icon-button button-class=${buttonClass} img-src="${imgSrc}" img-class=${imgClass}></icon-button>
  `;
}

export function createIconTextButton(buttonClass: string, imgSrc: string, imgClass: string, text: string) {
  return `
      <icon-text-button button-class=${buttonClass} img-src="${imgSrc}" img-class=${imgClass} text="${text}"></icon-text-button>
  `;
}
export function createTextButton(buttonClass: string, text: string) {
  return `
      <text-button button-class=${buttonClass} text="${text}"></text-button>
  `;
}
