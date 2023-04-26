import React from 'react';
import styles from './Pagination.module.scss';

const Pagination = ({ value, onClickPagination }) => {
  const paginElem = [1, 2, 3];

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
