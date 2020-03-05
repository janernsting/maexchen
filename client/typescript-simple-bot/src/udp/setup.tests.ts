import { MessageSender } from 'udp/udp-client';

class Just implements MessageSender {
  send(message: string): void {
  }
}

test('can do absolute imports', () => {
  expect(new Just()).toBeTruthy();
});
