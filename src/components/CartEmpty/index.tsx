import React from 'react'
import { Link } from 'react-router-dom'

const CartEmpty: React.FC = () => {
  return (
    <div className="content">
        <div className="container container--cart">
          <div className="cart cart--empty">
            <h2>Корзинa пустая :(</h2>
            <p>
              Вероятней всего, вы не заказывали ещё пиццу.<br/>
              Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            <img src="/img/empty-cart.png" alt="Emptycart"/>
            <Link to="/" className="button button--black">
              <span>Вернуться назад</span>
            </Link>
          </div>
        </div>
      </div>
  )
}

export default CartEmpty