import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'anastasia',
  password: 'password',
  database: 'BookStore',
});

app.get('/', (req, res) => {
  res.send('Hello from backend');
});

//getting all books
app.get('/books', (req, res) => {
  const q = 'SELECT * FROM Books';
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//adding books
app.post('/books', (req, res, next) => {
  const q =
    'INSERT INTO Books (`NameOfBook`, `Author`, `Id`, `Category`, `Description`, `DateOfPublish`, `Price`, `PublishersId`) VALUES (?)';

  const values = [
    req.body.NameOfBook,
    req.body.Author,
    req.body.Id,
    req.body.Category,
    req.body.Description,
    req.body.DateOfPublish,
    req.body.Price,
    req.body.PublishersId,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json('Book added successfully');
  });
});

//deleteing books
app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const q = 'DELETE FROM Books WHERE Id = ?';

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json('Book deleted successfully');
  });
});

//updating books
app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const q =
    'UPDATE Books SET `NameOfBook` = ? , `Author` = ?, `Price` = ? WHERE Id = ?';

  const values = [req.body.NameOfBook, req.body.Author, req.body.Price];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json('Book updated successfully');
  });
});

//registration
app.post('/register', (req, res) => {
  const q =
    'INSERT INTO Clients (`PhoneNumber`, `FullName`, `AmountOfOrders`, `Address` ) VALUES (?)';

  const values = [
    req.body.PhoneNumber,
    req.body.FullName,
    req.body.AmountOfOrders,
    req.body.Address,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json('User registered successfully');
  });
});

//login
app.post('/login', (req, res) => {
  const q = 'SELECT * FROM Clients WHERE `PhoneNumber` = ? AND `FullName` = ?';

  const values = [req.body.PhoneNumber, req.body.FullName];

  db.query(q, [...values], (err, data) => {
    if (err) {
      res.send({ err: err });
    }

    if (data.length > 0) {
      res.send(data);
    } else {
      res.send({ message: 'Користувача не знайдено' });
    }
  });
});

//counting books
app.get('/count', (req, res) => {
  const q = 'SELECT COUNT(*) FROM Books';

  db.query(q, (err, data) => {
    if (err) {
      res.send({ err: err });
    }

    if (data.length > 0) {
      res.send(data);
    }

  })
})

//counting clients
app.get('/countclients', (req, res) => {
  const q = 'SELECT COUNT(*) FROM Clients';

  db.query(q, (err, data) => {
    if (err) {
      res.send({ err: err });
    }
    
    if (data.length > 0) {
      res.send(data);
    }

  })
})

//counting orders
app.get('/countorders', (req, res) => {
  const q = 'SELECT COUNT(*) FROM Orders';

  db.query(q, (err, data) => {
    if (err) {
      res.send({ err: err });
    }
    
    if (data.length > 0) {
      res.send(data);
    }

  })
})

//searching books
app.post('/search', (req, res) => {
  const q = 'SELECT * FROM Books WHERE `NameOfBook` LIKE ?';

  const search = '%' + req.body.search + '%';

  db.query(q, [search], (err, data) => {
    if (err) {
      res.send({ err: err });
    }
    
    if (data.length > 0) {
      res.send(data);
    }

  })
})


app.listen(8800, () => {
  console.log('Connected to backend');
});
