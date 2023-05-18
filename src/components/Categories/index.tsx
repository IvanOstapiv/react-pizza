import React from 'react';
import {useWhyDidYouUpdate} from 'ahooks'

type CategoriesProps = {
  value: number;
  onClickCategory: (index: number) => void;
}
const categories = ['Всі', "М'ясні", 'Вегетаріанська', 'Гриль', 'Гострі', 'Закриті'];

const Categories: React.FC<CategoriesProps> = React.memo(({value, onClickCategory }) => {
  
  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
