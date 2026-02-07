import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { WebSocket, WebSocketServer } from 'ws';
import { RoomService } from './services/RoomService';
import { authMiddleware } from './middlewares/AuthMiddleware';
import { Server as Hocuspocus } from '@hocuspocus/server';

const app = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:5173', methods: ['GET', 'POST'] }));

const server = http.createServer(app);

// PROTOCOL 1: Socket.io (Control Plane)
const io = new Server(server, {
  cors: { origin: 'http://localhost:5173', methods: ['GET', 'POST'] },
});

io.use(authMiddleware);

const roomService = new RoomService(io);

io.on('connection', (socket) => {
  roomService.initialize(socket);
});

// PROTOCOL 2: Hocuspocus (Yjs Data Plane)
const hocuspocus = new Hocuspocus({
  name: 'collaborative-ide',
  timeout: 30000,
  quiet: true,
  onConnect: async (data) => {
    console.log(`📝 Collab Stream: User connected to ${data.documentName}`);
  },
});

interface HocuspocusInternal {
  webSocketServer: WebSocketServer;
}

server.on('upgrade', (request, socket, head) => {
  if (request.url?.startsWith('/collab')) {
    const instance = hocuspocus as unknown as HocuspocusInternal;
    const wsServer = instance.webSocketServer;

    wsServer.handleUpgrade(request, socket, head, (ws: WebSocket) => {
      wsServer.emit('connection', ws, request);
    });
  }
});

server.listen(port, () => {
  console.log(`🚀 Orchestrator running on http://localhost:${port}`);
});
