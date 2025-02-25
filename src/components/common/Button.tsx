/** @jsx createElement */
import createElement from '@/utils/createElement';
import { IButton } from 'types/types';

// export default class Button {
//   buttonClass: string;
//   imgSrc: string;
//   imgClass: string;
//   text: string;
//   onClick: () => void;

//   constructor({ buttonClass = '', imgSrc = '', imgClass = '', text = '', onClick = () => {} }: IButton) {
//     this.buttonClass = buttonClass;
//     this.imgSrc = imgSrc;
//     this.imgClass = imgClass;
//     this.text = text;
//     this.onClick = onClick;
//   }

//   render(): string {
//     return `
//       <button class="${this.buttonClass}" onclick="(${this.onClick.toString()}).call(this)">
//         ${this.imgSrc ? `<img class="${this.imgClass}" src="${this.imgSrc}" alt="button image" />` : ''}
//         ${this.text ? `<span>${this.text}</span>` : ''}
//       </button>
//     `;
//   }
// }

export default function Button({
  buttonClass,
  imgSrc,
  imgClass,
  text,
  onClick,
}: {
  buttonClass: string;
  imgSrc: string;
  imgClass: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button className={buttonClass} onClick={onClick}>
      {imgSrc && <img className={imgClass} src={imgSrc} alt="button image" />}
      {text && <span>{text}</span>}
    </button>
  );
}
