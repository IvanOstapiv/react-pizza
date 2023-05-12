import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, CartItem, selectItemsById } from '../../redux/Slices/cartSlice';

type PizzaBlockProps = {
  id: string;
  imageUrl: string;
  title: string;
  type: number[];
  sizes: number[];
  price: number;
}
const typeName = ['тонкое', 'традиционное'];

const PizzaBlock: React.FC<PizzaBlockProps> = ({id, imageUrl, title, type, sizes, price }) => {
  
  const dispatch = useDispatch()
  const cartItem = useSelector(selectItemsById(id))

  const [activeType, setActiveType] = React.useState<number>(0);
  const [activeSizes, setActiveSizes] = React.useState<number>(0);

  const isAdded = cartItem ? cartItem.count : 0;

  const onClickAddButton = () => {
    const item: CartItem = {
      id,
      title,
      imageUrl,
      price,
      type: typeName[activeType],
      sizes: sizes[activeSizes],
      count: 0,
    }
    dispatch(addItem(item))
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {type.map((typeId) => (
            <li
              key={typeId}
              onClick={() => setActiveType(typeId)}
              className={activeType === typeId ? 'active' : ''}>
              {typeName[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((item, index) => (
            <li
              key={index}
              onClick={() => setActiveSizes(index)}
              className={activeSizes === index ? 'active' : ''}>
              {item} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">Від {price} ₴</div>
        <button onClick={onClickAddButton} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Додати</span>
          {
          isAdded > 0 && <i>{isAdded}</i>}
        </button>
      </div>
    </div>
  );
}

export default PizzaBlock;
