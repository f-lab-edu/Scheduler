/** @jsx createElement */
import createElement from '@/utils/createElement';
import { TTab } from 'types/types';
import Tab from '@/components/tab/Tab';

export default function Tabs({ tabs }: { tabs: TTab[] }) {
  return (
    <section className="tabs">
      {tabs.map((tab) => (
        <Tab tabName={tab} />
      ))}
    </section>
  );
}
