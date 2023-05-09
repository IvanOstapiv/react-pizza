import React from 'react';
import styles from './Pagination.module.scss';

type PaginationProps = {
  value: number;
  onClickPagination: (i: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ value, onClickPagination }) => {
  const paginElem: number[] = [1, 2, 3];

  return (
    <ul className={styles.root}>
      <li>&lt;</li>
      {paginElem.map((item, i) => (
        <li
          key={i}
          onClick={() => onClickPagination(i)}
          className={value == i ? styles.active : ''}>
          <a>{item}</a>
        </li>
      ))}
      <li>&gt;</li>
    </ul>
  );
}

export default Pagination;
