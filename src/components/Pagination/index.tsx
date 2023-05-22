import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { selectPizza, setSelectPagination } from '../../redux/Slices/pizzasSlice';
import styles from './Pagination.module.scss';

const paginElem: number[] = [1, 2, 3];

type TPaginationProps = {
  selectPagination: number;
}

const Pagination: React.FC<TPaginationProps> = React.memo(({selectPagination}) => {
  
  const dispatch = useAppDispatch();

  return (
    <ul className={styles.root}>
      <li onClick={() => dispatch(setSelectPagination(selectPagination > 1 ? selectPagination-1 : 0))} >&lt;</li>
      {paginElem.map((item, i) => (
        <li
          key={i}
          onClick={() => dispatch(setSelectPagination(i))}
          className={selectPagination == i ? styles.active : ''}>
          <a>{item}</a>
        </li>
      ))}
      <li onClick={() => dispatch(setSelectPagination(selectPagination < paginElem.length-1 ? selectPagination+1 : paginElem.length-1))} >&gt;</li>
    </ul>
  );
});

export default Pagination;
