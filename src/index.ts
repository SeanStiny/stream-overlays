import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { Server } from 'socket.io';
import { eventsub } from './eventsub';
import { Database } from './models/database';

// Application server and socket.
const app = express();
const port = parseInt(process.env.PORT || '8080');
const server = createServer(app);
const io = new Server(server);

// Endpoints.
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(
  express.raw({
    type: 'application/json',
  })
);

app.post('/eventsub', (req, res) => {
  eventsub(req, res, io, database);
});

// Database.
const database = new Database(
  process.env.MONGO_URL || 'mongodb://localhost:27017',
  process.env.DB_NAME || 'overlays'
);

// Socket.io events.
io.on('connection', (socket) => {
  console.log(`New connection from ${socket.handshake.address}`);

  socket.onAny((...args) => {
    console.log(`> ${args}`);
  });

  socket.on('query recent', async () => {
    const recent = await database.alerts?.query(
      [
        {
          type: 'cheer',
          minimum: 50,
        },
        {
          type: 'sub',
          minimum: 1,
        },
        {
          type: 'resub',
          minimum: 1,
        },
        {
          type: 'gift',
          minimum: 1,
        },
      ],
      5
    );
    socket.emit('recent', recent);
  });
});

database
  .connect()
  .then(() => {
    server.listen(port);
    console.log(`Listening on port ${port}`);
  })
  .catch((error) => {
    console.error(error);
  });
