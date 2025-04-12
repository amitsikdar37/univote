const express = require('express');
const cors = require('cors');
const signInRouter = require('./router/signInRouter');

const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(signInRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});