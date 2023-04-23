import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="books my-10">
      <Link to="/books" className='base_btn'>
        <button className="btn base_btn">Показати всі книги</button>
      </Link>
      <Link to="/add" className='base_btn'>
        <button className="btn base_btn">Додати книгу +</button>
      </Link>
      <Link to="/about" className='base_btn'>
        <button className="btn base_btn">Про нас</button>
      </Link>
      {/* <button className="btn base_btn">якась функція ще</button> */}
    </div>
  );
};

export default Navigation;
