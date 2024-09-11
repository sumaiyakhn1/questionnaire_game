const express = require('express');
const cors = require('cors');
const adminRouter = require("./servermain");

const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
//   });

app.use("/", adminRouter);



app.listen(5000, () => console.log('Server running on port 5000'));

