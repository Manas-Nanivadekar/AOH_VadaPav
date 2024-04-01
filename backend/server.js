const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})

app.get('/', (req, res) => {
    res.send('Hello World');
});




app.use('/deploy', userRoutes);