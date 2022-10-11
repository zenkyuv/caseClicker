export type SessionConnectHandler = (ev: Event) => any;
export type SessionMessageHnalder = (ev: MessageEvent<any>) => any;
export type SessionDisconnectHandler = (ev: Event) => any;

export type SessionHook = [
  ConnectFN,
  <T extends any>(args: T) => void,
  () => void
];


export type ConnectFN = (
	clientID: string,
	action: string
) => void;

export interface Contextable {
  context: string;
}