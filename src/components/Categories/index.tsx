import React from 'react';
import AppContext from '../../../context';

type CategoriesProps = {
  value: number;
  onClickCategory: (index: number) => void;
}

const Categories: React.FC<CategoriesProps> = ({value, onClickCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];


  return (
    <AppContext.Provider value={{}}>
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
    </AppContext.Provider>
  );
}

export default Categories;
