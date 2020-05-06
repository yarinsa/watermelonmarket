import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { apolloServer } from './apollo';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
const app = express();
const http = require('http').createServer(app);

app.use(cookieParser());
app.use(bodyParser.json());

apolloServer.applyMiddleware({ app });

app.use(express.static(path.resolve(__dirname, '../../frontend/build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

const port = process.env.PORT || 3030;
http.listen(port, () => {
    console.log('Server is running on port: ' + port);
});
