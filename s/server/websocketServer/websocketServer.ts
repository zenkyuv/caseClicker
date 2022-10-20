// import {Server} from "socket.io"
import { Server } from 'http';
import { WebSocketServer } from 'ws'
import { exposeViaWebsockets } from './utils/exposeViaWebsockets.js';

const websocketServer = (expressServer: Server) => {
 const server = new WebSocketServer({
    noServer: true,
 });

	expressServer.on("upgrade", (request, socket:any, head) => {
    server.handleUpgrade(request, socket, head, (websocket) => {
			server.emit("connection", websocket, request);
    });
	});
	server.on("connection", connection => exposeViaWebsockets(connection))
};

export default websocketServer