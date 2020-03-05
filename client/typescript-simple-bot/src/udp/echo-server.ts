import dgram, { RemoteInfo } from 'dgram';

const server = dgram.createSocket('udp4');

server.on('listening', () => {
  const address = server.address();
  console.log(`UDP Server listening on ${address.address}:${address.port}`);
});

server.on('error', (error: Error) => {
  console.log(`Error: ${error}`);
  server.close();
});

server.on('message', (message: Buffer, remote: RemoteInfo) => {
  const origin = `${remote.address}:${remote.port}`;
  console.log(`${origin} - received ${message}`);
  server.send(message, remote.port, remote.address, (error: Error | null) => {
    if (null !== error) {
      console.log(`${origin} - echo failed`, error);
      return;
    }
    console.log(`${origin} - echo send`);
  });
});

server.bind(9000, '127.0.0.1');
