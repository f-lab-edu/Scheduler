/** @jsx createElement */
import createElement from '@/utils/createElement';
import { IStatusList, TTab, ITabTaskInfo } from 'types/types';
import ActionGroup from './common/ActionGroup';
import StatusList from './StatusList';

export default function Contents({ info }: { info: ITabTaskInfo }) {
  return (
    <section className="contents">
      <ActionGroup />
      <StatusList statusData={{ listType: 'To do', taskCount: 0 }} />

      {/* 
      TODO: Calendar 탭 생성 시 처리
      {info.tabName === 'Board' ? <StatusList taskStatus={info.tabName} /> : <Calendar/>} */}
    </section>
  );
}
