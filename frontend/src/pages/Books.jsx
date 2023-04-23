import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navigation from '../pages/Navigation';
import Search from '../pages/Search';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searching, setSearching] = useState(false);
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get('http://localhost:8800/books');
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:8800/books/' + id);
      window.location.reload();
    } catch (err) {}
  };

  const [search, setSearch] = useState('');
  const [found, setFound] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    if (search.trim().length === 0) {
      setSearching(false);
    } else {
      setSearching(true);
      try {
        axios
          .post('http://localhost:8800/search', { search: search })
          .then((res) => {
            setFound(res.data);
            console.log('res.data', res.data);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <Navigation />
      <hr className="my-10" />
      <h2 className="text-center text-3xl mb-5">Всі книги</h2>
      {/* search */}
      <div className="flex justify-center">
        <label className="">
          <input
            className="input-base"
            type="text"
            placeholder="Назва книги"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            required
          ></input>
          <button
            className="btn delete_btn delete_btn_alt ml-3"
            onClick={handleClick}
          >
            Пошук
          </button>
        </label>
      </div>

      {searching ? (
        <div className="books">
          {found.map((book) => (
            <div className="flex flex-col mb-7" key={book.Id}>
              <div className="card">
                <div className="content">
                  <div className=" w-full">
                    <h3 className="base_text base_text_bold">
                      {book.NameOfBook}
                    </h3>
                    <p className="base_text">{book.Author}</p>
                  </div>
                  <div className="desc w-full">
                    <p className="little_text">
                      <span className="little_text_bold">Жанр: </span>
                      {book.Category}
                    </p>
                    <p className="little_text">
                      <span className="little_text_bold">Ціна: </span>
                      {book.Price} <span className="little_text"> ₴</span>
                    </p>
                  </div>
                </div>
              </div>
              <Link to={`/update/${book.Id}`} className="mx-auto">
                <button className="btn delete_btn">Редагувати</button>
              </Link>
              <button
                className="btn delete_btn delete_btn_alt mx-auto mt-2"
                onClick={() => handleDelete(book.Id)}
              >
                Видалити
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="books">
          {books.map((book) => (
            <div className="flex flex-col mb-7" key={book.Id}>
              <div className="card">
                <div className="content">
                  <div className=" w-full">
                    <h3 className="base_text base_text_bold">
                      {book.NameOfBook}
                    </h3>
                    <p className="base_text">{book.Author}</p>
                  </div>
                  <div className="desc w-full">
                    <p className="little_text">
                      <span className="little_text_bold">Жанр: </span>
                      {book.Category}
                    </p>
                    <p className="little_text">
                      <span className="little_text_bold">Ціна: </span>
                      {book.Price} <span className="little_text"> ₴</span>
                    </p>
                  </div>
                </div>
              </div>
              <Link to={`/update/${book.Id}`} className="mx-auto">
                <button className="btn delete_btn">Редагувати</button>
              </Link>
              <button
                className="btn delete_btn delete_btn_alt mx-auto mt-2"
                onClick={() => handleDelete(book.Id)}
              >
                Видалити
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
