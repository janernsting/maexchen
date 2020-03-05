import { UdpClient } from 'udp/udp-client';

const allReceivedMessages: string[] = [];
const udpClient = new UdpClient('127.0.0.1', 9000, 'trace');
udpClient.incomingMessages.add(message => allReceivedMessages.push(message));
udpClient.incomingMessages.filter(message => message !== 'wohooo').add(() => udpClient.send('wohooo'));
udpClient.connect();
udpClient.send(`REGISTER;SimpleBot`);

console.log('press ctrl+c to stop the client');
process.on('SIGINT', () => {
  console.log(allReceivedMessages);
});
