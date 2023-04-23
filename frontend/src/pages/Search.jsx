import axios from 'axios';
import React, { useState } from 'react';

const Search = () => {
  const [search, setSearch] = useState('');
  const [found, setFound] = useState([])

  const handleClick = (e) => {
    e.preventDefault();
    try {
      axios.post('http://localhost:8800/search',  {search: search} ).then(res => {
        setFound(res.data)
        console.log('res.data', res.data)
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center">
      <label className="">
        <input
          className="input-base"
          type="text"
          placeholder="Назва книги"
          onChange={(e) => setSearch(e.target.value)}
          required
        ></input>
        <button
          className="btn delete_btn delete_btn_alt ml-3"
          onClick={handleClick}
        >
          Пошук
        </button>
        {found.map(b => (
          <li key={b.Id}>{b.NameOfBook}</li>
        ))}
      </label>
    </div>
  );
};

export default Search;
