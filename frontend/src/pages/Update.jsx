import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Update = () => {
  const [book, setBook] = useState({
    NameOfBook: '',
    Author: '',
    Price: null,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split('/')[2];

  const handleChange = (e) => {
    setBook((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8800/books/' + bookId, book);
      navigate('/books');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <h2 className="text-center text-3xl my-5">Редагувати книгу</h2>
      <div className="flex flex-col items-center">
        <label>
          <span className="input-base_label">Назва книги</span>
          <input
            className="input-base"
            type="text"
            name="NameOfBook"
            placeholder="Назва книги"
            onChange={handleChange}
            required
          ></input>
        </label>

        <label>
          <span className="input-base_label">Автор</span>
          <input
            className="input-base"
            type="text"
            name="Author"
            placeholder="Автор"
            onChange={handleChange}
            required
          ></input>
        </label>

        <label>
          <span className="input-base_label">Ціна</span>
          <input
            className="input-base"
            type="number"
            name="Price"
            placeholder="Ціна"
            onChange={handleChange}
          ></input>
        </label>

        <button className="btn base_btn my-10" onClick={handleClick}>
          Редагувати
        </button>
        <Link to="/books" className="btn mt-2">
          Назад
        </Link>
      </div>
    </div>
  );
};

export default Update;
