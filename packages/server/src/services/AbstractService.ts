import { Server, Socket } from 'socket.io';

export abstract class AbstractService {
  protected io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  public abstract initialize(socket: Socket): void;

  protected log(message: string): void {
    const serviceName = this.constructor.name;
    console.log(`[${serviceName}] ${message}`);
  }
}
