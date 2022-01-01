import { WebSocket, WebSocketServer } from 'ws';

const clients: {
  ws: WebSocket;
  authenticated: boolean;
}[] = [];

const wss = new WebSocketServer({ port: parseInt(process.env.PORT || '8080') });

wss.on('connection', (ws) => {
  const client = {
    ws,
    authenticated: false,
  };
  clients.push(client);

  ws.on('message', (data) => {
    data
      .toString()
      .split(/\r?\n/)
      .forEach((line) => {
        if (line.length > 0) {
          const message = JSON.parse(line);

          if (client.authenticated) {
            switch (message.type) {
              case 'query-recent':
                break;
            }
          } else if (message.type === 'pass') {
            if (message.data.pass === process.env.WS_PASS) {
              client.authenticated = true;
            }
          } else {
            ws.close();
          }
        }
      });
  });

  ws.on('close', () => {
    const index = clients.indexOf(client);
    clients.splice(index, 1);
  });
});
