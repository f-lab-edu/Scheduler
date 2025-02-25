/** @jsx createElement */
import createElement from '@/utils/createElement';
import { TStatusList } from 'types/types';
import Button from './common/Button';
import moreIcon from '@/assets/three-dots.svg';
import plusIcon from '@/assets/plus.svg';

export default function StatusHeader({ status, count }: { status: TStatusList; count: number }) {
  return (
    <div className="status-header">
      <div className="status-info">
        <h2 className="status">{status}</h2>
        <span className="task-count">{count}</span>
      </div>
      <div className="status-btns">
        <Button
          buttonClass="more-button"
          imgSrc={moreIcon}
          imgClass="more-icon"
          text=""
          onClick={() => console.log('more 버튼 클릭!')}
        />
        <Button
          buttonClass="plus-button"
          imgSrc={plusIcon}
          imgClass="plus-icon"
          text=""
          onClick={() => console.log('plus 버튼 클릭!')}
        />
      </div>
    </div>
  );
}
