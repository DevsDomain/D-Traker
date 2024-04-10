import express from 'express'

import { routes } from './routes/index.routes';
import connect from './models/connection';
const PORT = 3008
const server = express();

server.use(express.json());

server.listen(PORT, () => {
    console.log(`Server Running at PORT:${PORT}`);
})

connect();
server.use(routes);