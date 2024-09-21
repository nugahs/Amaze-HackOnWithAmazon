const express = require('express');
const app = express();
const cors = require('cors')

const payment  =  require("./router/payment")
const budget =  require("./router/budget")
const history =  require("./router/history")

const port = 10000

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/payment', payment);
app.use('/budget', budget);
app.use('/history', history);

    app.listen(port, () => {
        console.log(` server running on http://localhost:${port}`);
    });

