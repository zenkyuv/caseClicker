export type SessionConnectHandler = (ev: Event) => any;
export type SessionMessageHandler = (ev: MessageEvent<any>) => any;
export type SessionDisconnectHandler = (ev: Event) => any;

export type SessionHook = [
  ConnectFN,
  <T extends any>(args: T) => void,
  () => void,
];

export interface RoomCreator {
	roomID: string,
	action: string,
	username: string,
}
export interface LobbyUser {
	clientID: string,
	action: string
}
export type ConnectFN = (
	data: RoomCreator | LobbyUser
) => void;

// export interface Contextable {
//   context: string;
// }