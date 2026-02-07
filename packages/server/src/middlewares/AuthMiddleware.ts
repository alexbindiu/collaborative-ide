import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';

export const authMiddleware = (socket: Socket, next: (err?: ExtendedError) => void) => {
  const username = socket.handshake.auth.username;

  if (!username) {
    console.log(`⛔ Connection Rejected: No username provided [${socket.id}]`);
    return next(new Error('Authentication error: Username required'));
  }

  socket.data.username = username;

  console.log(`✅ Authenticated: ${username} [${socket.id}]`);
  next();
};
