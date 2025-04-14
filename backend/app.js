const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const signInRouter = require('./router/signInRouter');
const signUpRouter = require('./router/signUpRouter');


const app = express();

app.use(cors({
  origin: 'http://localhost:5500',
  credentials: true
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(signInRouter);
app.use(signUpRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = 3000;
mongoose.connect('mongodb+srv://sikdara477:omikun@cluster0.qyjcazl.mongodb.net/voters', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
  });
})

