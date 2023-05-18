import React, { ChangeEvent, ChangeEventHandler } from 'react';
import { useRef } from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setSearchValue } from '../../redux/Slices/filterSlice';

type TProps = {
  searchValue: string
}

const SearchInput: React.FC<TProps> = React.memo(({ searchValue }) => {
  const [value, setValue] = React.useState(''); //локальне змінення даних в пошуку
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 350),
    [],
  );
  const onChangetoSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  const inputDelete = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };
  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="EditableLine"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"></circle>
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"></line>
      </svg>
      <div className={styles.inputBlock}>
        <input
          ref={inputRef}
          value={value}
          onChange={onChangetoSearch}
          className={styles.input}
          placeholder="Пошук піцци..."
        />
        {searchValue && (
          <img onClick={inputDelete} width={20} height={20} src="./img/close.png" alt="clear"></img>
        )}
      </div>
    </div>
  );
});

export default SearchInput;
