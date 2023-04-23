import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import axios from 'axios';

const About = () => {
  const [bookCount, setBookCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    const fetchCountBooks = async () => {
      try {
        const res = await axios.get('http://localhost:8800/count');
        setBookCount(res.data[0]['COUNT(*)']);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCountClients = async () => {
      try {
        const res = await axios.get('http://localhost:8800/countclients');
        setClientCount(res.data[0]['COUNT(*)']);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCountOrders = async () => {
      try {
        const res = await axios.get('http://localhost:8800/countorders');
        setOrdersCount(res.data[0]['COUNT(*)']);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCountBooks();
    fetchCountClients();
    fetchCountOrders();
  }, []);

  return (
    <div>
      <Navigation />
      <hr className="my-10" />
      <h2 className="text-center text-3xl mb-5">Про нас</h2>
      <div className="flex flex-1 justify-center mt-10">
        <div className="flex flex-col block">
          <h2 className="text-center text-3xl mb-5">Кількість книжок</h2>
          <p className="text-center text-3xl mb-5">{bookCount}</p>
        </div>
        <div className="flex flex-col block">
          <h2 className="text-center text-3xl mb-5">Кількість клієнтів</h2>
          <p className="text-center text-3xl mb-5">{clientCount}</p>
        </div>
        <div className="flex flex-col block">
          <h2 className="text-center text-3xl mb-5">Кількість замовлень</h2>
          <p className="text-center text-3xl mb-5">{ordersCount}</p>
        </div>
      </div>
    </div>
  );
};

export default About;
