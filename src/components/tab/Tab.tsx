/** @jsx createElement */
import createElement from '@/utils/createElement';
import { TTab } from '../../../types/types';

export default function Tab({ tabName }: { tabName: TTab }) {
  return <button className="tab">{tabName}</button>;
}
