const connectDB = require('./config/db');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5454;

const app = express();
connectDB();

app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/account', require('./routes/accounts'));
app.use('/api/users', require('./routes/users'));
app.use('/api/transaction/', require('./routes/transactions'));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));