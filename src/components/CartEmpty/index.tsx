import React from 'react'
import { Link } from 'react-router-dom'

const CartEmpty: React.FC = () => {
  return (
    <div className="content">
        <div className="container container--cart">
          <div className="cart cart--empty">
            <h2>Корзинa порожня :(</h2>
            <p>
              Скоріше всього, ви не заказували ще піццу.<br/>
              Для того, щоб заказати піццу, перейди на головну сторінку.
            </p>
            <img src="/img/empty-cart.png" alt="Emptycart"/>
            <Link to="/" className="button button--black">
              <span>Повернутись назад</span>
            </Link>
          </div>
        </div>
      </div>
  )
}

export default CartEmpty