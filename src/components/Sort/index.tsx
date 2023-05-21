import React from 'react';
import { setOrderID, setSortID } from '../../redux/Slices/filterSlice';
import { useDispatch } from 'react-redux';

const sortName: string[] = ['популярністю', 'ціною', 'алфавітом'];
const orderName: string[] = ['зростанням', 'спаданням'];

type SortPopupProps = {
  SortIdVal: number;
  orderID: number;
};

const Sort: React.FC<SortPopupProps> = ({ SortIdVal, orderID }) => {
  const sortRef = React.useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const onClickPopup = (id: number) => {
    dispatch(setSortID(id));
  };
  const onClickPopupOrder = (id: number) => {
    dispatch(setOrderID(id));
  };

  const [openSort, setOpenSort] = React.useState(false);
  const [openOrder, setOrderSort] = React.useState(false);

  React.useEffect(() => {
    const clickOutSide = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpenSort(false);
        setOrderSort(false);
      }
    };

    document.body.addEventListener('click', clickOutSide);
    return () => {
      document.body.removeEventListener('click', clickOutSide);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>

        <b>Сортування за:</b>
        <span onClick={() => setOrderSort(!openOrder)}>{orderName[orderID]}</span>
        {openOrder && (
          <div className="sort__order">
            <ul>
              {orderName.map((item, i) => (
                <li
                  key={i}
                  onClick={() => onClickPopupOrder(i)}
                  className={orderID == i ? 'active' : ''}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <b>Сортування за:</b>
        <span onClick={() => setOpenSort(!openSort)}>{sortName[SortIdVal]}</span>
      </div>
      {openSort && (
        <div className="sort__popup">
          <ul>
            {sortName.map((item, i) => (
              <li
                key={i}
                onClick={() => onClickPopup(i)}
                className={SortIdVal == i ? 'active' : ''}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
