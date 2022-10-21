import { useCallback, useEffect, useState } from 'react';
import {
	ConnectFN,
  LobbyUser,
  RoomCreator,
  // Contextable,
  SessionConnectHandler,
  SessionDisconnectHandler,
  SessionHook,
  SessionMessageHandler,
} from '../interfaces/websocketTypes';

export function useSession(
  onOpen: SessionConnectHandler,
  onMessage: SessionMessageHandler,
	onClose: SessionDisconnectHandler,
	userID: string
): SessionHook {
  const [session, setSession] = useState(null as unknown as WebSocket);

  const updateOpenHandler = () => {
    if (!session) return;
    session.addEventListener('open', onOpen);
    return () => {
      session.removeEventListener('open', onOpen);
    };
  };

  const updateMessageHandler = () => {
    if (!session) return;
    session.addEventListener('message', onMessage);
    return () => {
      session.removeEventListener('message', onMessage);
    };
  };

  const updateCloseHandler = () => {
    if (!session) return;
    session.addEventListener('close', onClose);
    return () => {
      session.removeEventListener('close', onClose);
    };
  };

  useEffect(updateOpenHandler, [session, onOpen]);
  useEffect(updateMessageHandler, [session, onMessage]);
	useEffect(updateCloseHandler, [session, onClose]);
	useEffect(() => {
		return () => {
			if (session) close()
		}
	}, [session])
  const connect = useCallback(
		(data: RoomCreator | LobbyUser) => {
			// ?clientID=${clientID}&action=${action}
      const uri = `ws://192.168.109.129:3000`
			const ws = new WebSocket(uri);
			ws.onopen = () => ws.send(JSON.stringify(data))
			setSession(ws);
    },
    []
  );

	const sendMessage = <T extends any>(args: T) => {
		if (!session) return;
			session.send(JSON.stringify(args));
  };

	const close = useCallback(() => {
		console.log('closed')
    if (session.readyState === session.OPEN) session.close(1000, userID);
  }, [session]);

  return [connect, sendMessage, close];
}