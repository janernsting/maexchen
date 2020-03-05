import dgram, { RemoteInfo, Socket } from 'dgram'; // https://nodejs.org/api/dgram.html
import { Signal } from 'micro-signals';

export interface MessageSender {
  send(message: string): void;
}

export class UdpClient implements MessageSender {
  private readonly log: (msg: any) => void;
  private client: Socket | undefined;
  readonly incomingMessages = new Signal<string>();

  constructor(
    private readonly host: string,
    private readonly port: number,
    mode: 'silent' | 'trace' = 'silent'
  ) {
    this.log = mode === 'trace' ? (console.log) : () => {
    };
  }

  connect() {
    this.client = dgram.createSocket('udp4');
    this.client.on('error', ((err: Error) => {
      this.log(err);
      this.close();
    }));
    this.client.on('message', (messageBuffer: Buffer, info: RemoteInfo) => {
      const message = messageBuffer.toString();
      this.log(`${info.address}:${info.port} - received ${message}`);
      this.incomingMessages.dispatch(message);
    });
  }

  close() {
    this.client?.close();
    this.client = undefined;
  }

  send(message: string) {
    this.client?.send(message, this.port, this.host, (err: Error | null) => {
      if (err) throw err;
      const local = this.client;
      if (local === undefined) {
        return;
      }
      const address = local.address();
      this.log(`${address.address}:${address.port} - send ${message}`);
    });
  }
}
