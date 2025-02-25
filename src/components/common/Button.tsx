/** @jsx createElement */
import createElement from '@/utils/createElement';
import { IButton } from 'types/types';

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
