export function createIconButton(buttonClass: string, imgSrc: string, imgClass: string) {
  return `<icon-button button-class=${buttonClass} img-src="${imgSrc}" img-class=${imgClass}></icon-button>`;
}

export function createIconTextButton(buttonClass: string, imgSrc: string, imgClass: string, text: string) {
  return `<icon-text-button button-class=${buttonClass} img-src="${imgSrc}" img-class=${imgClass} text="${text}"></icon-text-button>`;
}
