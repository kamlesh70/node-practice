import http from "http";
import https from "https";
import path from "path";
import url from "url";
import { WebSocket, WebSocketServer } from "ws";
import { streams } from "./util/stream";
import "./util/event-loop";

const server = http.createServer();

server.on("request", async (req, res) => {
  console.log(req.url);
  if (req.url == "/test/1") {
    const promise = [];
    const options = {
      method: "GET",
      path: "/fact",
      hostname: "catfact.ninja",
    };
    for (let i = 0; i < 1; i++) {
      promise.push(
        new Promise((resolve, reject) => {
          const req = https.request(options, function (res) {
            let response = "";
            res.on("data", (chunk) => {
              response += chunk;
            });
            res.on("end", () => {
              try {
                resolve(JSON.parse(response));
              } catch (error: any) {
                reject("Error parsing JSON response: " + error?.message);
              }
            });
          });

          req.on("error", (error) => reject(error.message));
          req.end();
        })
      );
    }
    const results = await Promise.all(promise);
    console.log(results);
    res.write(JSON.stringify(results));
    res.end();
  } else if (req.url == "/test/2") {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
    res.write("testing");
    res.end();
  }
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
  // streams();
});
