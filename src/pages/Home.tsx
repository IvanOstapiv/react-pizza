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

const sortType: string[] = ['rating', 'price', 'title'];
const orderType: string[] = ['asc', 'desc'];

const Home: React.FC = () => {
  const { categoryID, sortID, orderID, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);
  const dispatch = useAppDispatch();

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryID(id));
  }, []);

  const [selectPagination, setSelectPagination] = React.useState(0);

  React.useEffect(() => {
    dispatch(
      fetchPizzas({
        selectPagination,
        categoryID,
        sortID,
        orderID,
        orderType,
        searchValue,
        sortType,
      }),
    );
    window.scroll(0, 0);
  }, [categoryID, searchValue, sortID, orderID, selectPagination]);

  return (
    <>
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories value={categoryID} onClickCategory={onClickCategory} />
            <Sort SortIdVal={sortID} orderID={orderID} />
          </div>
          <h2 className="content__title">Всі піцци</h2>
          <div className="content__items">
            {status === 'loading'
              ? [...Array(6)].map((_, index) => <Skeleton key={index} />)
              : items
                  // .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                  .map((pizza: any, id: number) => (
                    <PizzaBlock
                      key={pizza.id}
                      id={String(id)}
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
        </div>
      </div>
    </>
  );
};
export default Home;
