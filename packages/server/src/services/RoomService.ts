import { Socket } from 'socket.io';
import { AbstractService } from './AbstractService';
import { SocketEvent, JoinRoomRequest, JoinRoomResponse } from '@collaborative-ide/shared';

export class RoomService extends AbstractService {
  public initialize(socket: Socket): void {
    socket.on(SocketEvent.JOIN_REQUEST, (data: JoinRoomRequest) => {
      this.handleJoinRoom(socket, data);
    });
  }

  private handleJoinRoom(socket: Socket, data: JoinRoomRequest): void {
    this.log(`Socket ${socket.id} joining room: ${data.roomId}`);

    socket.join(data.roomId);

    // Send confirmation to the requester
    const response: JoinRoomResponse = {
      roomId: data.roomId,
      userId: socket.id,
    };
    socket.emit(SocketEvent.JOIN_RESPONSE, response);

    // Notify others
    this.io.to(data.roomId).emit(SocketEvent.USER_JOINED, {
      userId: socket.id,
      timestamp: Date.now(),
    });
  }
}
