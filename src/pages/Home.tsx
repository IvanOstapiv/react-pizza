import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setCategoryID } from '../redux/Slices/filterSlice';
import { fetchPizzas, selectPizza } from '../redux/Slices/pizzasSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const { categoryID, sortID, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);
  const dispatch = useAppDispatch()

  const onClickCategory = (id: number) => {
    dispatch(setCategoryID(id)); //dispatch - заставляєм мінятися state categoryID
  };

  const sortType: string[] = ['rating', 'price', 'title'];

  const [selectPagination, setSelectPagination] = React.useState(0);

  React.useEffect(() => {
    async function fetchData() {
      console.log('sort = ' + sortType[sortID]);
      console.log('category = ' + categoryID);

      dispatch(
        fetchPizzas({
          selectPagination,
          categoryID,
          sortID,
          searchValue,
          sortType,
        }),
      );
    }

    fetchData();
    window.scroll(0, 0);
  }, [categoryID, sortID, searchValue, selectPagination]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryID} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Всі піцци</h2>
      <div className="content__items">
        {status === 'loading'
          ? [...Array(6)].map((_, index) => <Skeleton key={index} />)
          : items
              // .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())) 
              .map((pizza: any) => (
                <PizzaBlock
                  key={pizza.id}
                  id={pizza.id}
                  imageUrl={pizza.imageUrl}
                  title={pizza.title}
                  type={pizza.types}
                  sizes={pizza.sizes}
                  price={pizza.price}
                />
              ))}
      </div>
      <Pagination
        value={selectPagination}
        onClickPagination={(id: number) => setSelectPagination(id)}
      />
    </>
  );
};
export default Home;
