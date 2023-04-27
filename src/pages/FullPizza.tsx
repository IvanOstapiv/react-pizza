import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const Navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://63f91d13a4ec283e998277c9.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Помилка при виборі піци');
        Navigate('/');
      }
    }
    fetchPizza()
  }, []);

  if (!pizza){
    return <>Загрузка...</>
  }
  return (
    <div className="container">
        <img src={pizza.imageUrl} alt="pizza" />
        <h2>{pizza.title}</h2>
        <h4>{pizza.price} UAH</h4>
    </div>
  );
};

export default FullPizza;
