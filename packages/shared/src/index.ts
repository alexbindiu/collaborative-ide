export interface User {
  username: string;
  roomId: string;
}

export enum SocketEvent {
  JOIN_REQUEST = 'room:join',
  JOIN_RESPONSE = 'room:joined',
  USER_JOINED = 'room:user_joined',
  USER_LEFT = 'user-left',
  CODE_CHANGE = 'code-change',
  SYNC_CODE = 'sync-code',
}

export interface JoinRoomRequest {
  roomId: string;
  username?: string;
}

export interface JoinRoomResponse {
  roomId: string;
  userId: string;
}

export interface UserJoinedEvent {
  userId: string;
  timestamp: number;
}
