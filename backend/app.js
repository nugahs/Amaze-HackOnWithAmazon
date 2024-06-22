const express = require('express');
const app = express();
const cors = require('cors')

const payment  =  require("./router/payment")
const budget =  require("./router/budget")
const history =  require("./router/history")

const port = 6000

const corsOptions = {
    origin: true, // Allow all origins
    credentials: true // Allow cookies and credentials in requests
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/payment', payment);
app.use('/budget', budget);
app.use('/history', history);

    app.listen(port, () => {
        console.log(` server running on http://localhost:${port}`);
    });

