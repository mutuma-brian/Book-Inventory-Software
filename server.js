const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());


const secretKey = 'KwtUGtRgjhJ8hj'; 


const users = [];


app.post('/register', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully' });
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/login', verifyToken, (req, res) => {
 
  res.status(200).json({ message: 'Profile fetched successfully', user: req.user });
});


function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token) return res.status(403).json({ message: 'No token provided' });
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = decoded; 
    next(); 
  });
}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('sucess');
});
