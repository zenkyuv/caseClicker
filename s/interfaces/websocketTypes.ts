export type SessionConnectHandler = (ev: Event) => any;
export type SessionMessageHandler = (ev: MessageEvent<any>) => any;
export type SessionDisconnectHandler = (ev: Event) => any;

export type SessionHook = [
  ConnectFN,
  <T extends any>(args: T) => void,
  () => void,
];

export interface RoomCreator {
	roomID?: string,
	action: string,
	inventory?: any[],
	room?: 'publicRoom' | 'privateRoom' | 'publicLobby',
	username?: string,
	userType: 'roomCreator',
}
export interface LobbyUser {
	clientID: string,
	connection?: WebSocket,
	roomYouConnectedTo?: WebSocket,
	connectedToRoom?: boolean,
	inventory?: [],
	userType: 'userFromLobby',
	action: string
}
export type ConnectFN = (
	data: RoomCreator | LobbyUser
) => void;

// export interface Contextable {
//   context: string;
// }