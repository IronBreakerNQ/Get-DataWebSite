const express = require('express');
const cors = require('cors');
const DateRouter = require('./DataCheck');

const app = express();
app.use(cors());
const PORT = 3001;



app.use(express.json());

app.use(DateRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
