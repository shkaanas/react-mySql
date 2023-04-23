import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [client, setClient] = useState({
    "PhoneNumber": '',
    "FullName": '',
  });

  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setClient((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = () => {
    if (client.PhoneNumber.length < 12) {
      setMsg('Номер телефону повинен бути не менше 12 символів');
    } else {
      setMsg('');
      axios.post('http://localhost:8800/login', client).then((res) => {
        if (res.data.message) {
          setMsg(res.data.message);
        } else {
          setMsg('');
          navigate('/books');
        }
      });
    }
  };

  return (
    <div className="">
      <h2 className="text-center text-3xl my-5">Вхід</h2>
      <div className="flex flex-col items-center">
        <label>
          <span className="input-base_label">Номер телефону</span>
          <input
            className="input-base"
            type="number"
            name="PhoneNumber"
            placeholder="380687755639"
            onChange={handleChange}
            required
          ></input>
        </label>

        <label>
          <span className="input-base_label">Ваше ім'я та прізвище</span>
          <input
            className="input-base"
            type="text"
            name="FullName"
            placeholder="Іван Карпенко"
            onChange={handleChange}
            required
          ></input>
        </label>
        {msg && <span className="text-red-500 mb-5">{msg}</span>}

        <button className="btn base_btn my-10" onClick={handleClick}>
          Ввійти
        </button>
        <Link to="/" className="btn mt-2">
          Ще не зареєстрований(а)
        </Link>
      </div>
    </div>
  );
};

export default Login;
