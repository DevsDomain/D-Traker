import express from 'express'

import { routes } from './routes'
import connect from './models/connection';

const server = express();

server.use(express.json());

server.listen(3008, () => {
    console.log("Server Running");
})

connect();
server.use(routes);