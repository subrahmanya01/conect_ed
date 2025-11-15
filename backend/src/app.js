import express from 'express';
import http from "http";
import { port } from './config/index.js';
import loader from './loaders/index.js';
import {Server} from 'socket.io';
import { connectSocket } from './utils/socket.js';

const allowedOrigins = [
  "http://localhost:4200",
  "https://conect-ed.vercel.app"
];

const app = express();
app.use(cors({ origin: allowedOrigins }));
app.set('base-url', '/api');

loader(app);

const server = http.createServer(app)

const io= new Server(server, {
  cors: {
    origin: [...allowedOrigins], 
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
})


connectSocket(io);

server.listen(process.env.PORT || port, err => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  
  console.log(`Server is running on ${port}`);
});

export default app