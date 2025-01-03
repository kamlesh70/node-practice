import http from "http";
import path from "path";
import { WebSocket, WebSocketServer } from "ws";
import { streams } from "./util/stream";

const server = http.createServer(function (req: any, res: any) {
  const pathname = new URL(req.url, "http://localhost");
  console.log(pathname, req.url);
  res.write("working");
  res.end();
});

const wss = new WebSocketServer({ server });

wss.on("connection", (socket: any) => {
  socket.on("error", (err: any) => console.error(err));
  socket.on("message", (message: any, isBinary: any) => {
    wss.clients.forEach((client: any) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message, { binary: isBinary });
      }
    });
  });

  socket.send("hello you are not connected with the socket server");
});

server.listen(3000, () => {
  console.log("listening on port");
  streams();
});
