/** @jsx createElement */
import createElement from '@/utils/createElement';
import plus from '@/assets/plus.svg';
import search from '@/assets/search.svg';
import filter from '@/assets/funnel.svg';
import Button from './Button';

export default function ActionGroup() {
  return (
    <section className="action-group">
      <div className="left-actions">
        <div className="total-tasks">8 tasks</div>
        {/* ${plusBtn} */}
        <Button
          buttonClass="add-new-button"
          imgSrc={plus}
          imgClass="plus-icon"
          text="Add New"
          onClick={() => console.log('Add New 버튼 클릭!')}
        />
      </div>
      <div className="right-actions">
        <div className="search-bar">
          <img className="search-icon" src={search} alt="search icon" />
          <input value="" placeholder="Type your search keyword" />
        </div>

        <Button
          buttonClass="filter-button"
          imgSrc={filter}
          imgClass="filter-icon"
          text="Filters"
          onClick={() => console.log('Filters 버튼 클릭!')}
        />
      </div>
    </section>
  );
}
