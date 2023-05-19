import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.contentBlock}>
        <h1>Сторінка не знайдена :( </h1>
        <ul>
          <h2>dasdasd</h2>
          <li>dasdasdas</li>
        </ul>
        <Link to="/">
          <button>Головна</button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundBlock;
