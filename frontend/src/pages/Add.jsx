import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Add = () => {
  const [book, setBook] = useState({
    NameOfBook: '',
    Author: '',
    Id: null,
    Category: '',
    Description: '',
    DateOfPublish: '2021-01-01',
    Price: null,
    PublishersId: '1113',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8800/books', book);
      navigate('/books');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <h2 className="text-center text-3xl my-5">Додати нову книгу</h2>
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
          <span className="input-base_label">Жанр</span>
          <input
            className="input-base"
            type="text"
            name="Category"
            placeholder="Жанр"
            onChange={handleChange}
            required
          ></input>
        </label>

        <label>
          <span className="input-base_label">Короткий опис</span>
          <textarea
            rows="4"
            className="input-base"
            type="text"
            name="Description"
            placeholder="Короткий опис"
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <label>
          <span className="input-base_label">Актикул</span>
          <input
            className="input-base"
            type="number"
            name="Id"
            placeholder="Актикул"
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
          Додати
        </button>
        <Link to="/books" className="btn mt-2">
          Назад
        </Link>
      </div>
    </div>
  );
};

export default Add;
