import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class MessagesGateway {
  @SubscribeMessage('sendMessage')
  handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { matchId: string; text: string },
  ) {
    client.emit('messageReceived', {
      id: `msg-${Date.now()}`,
      text: payload.text,
      timestamp: new Date().toISOString(),
    });
  }

  @SubscribeMessage('typingStatus')
  handleTypingStatus(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { matchId: string; isTyping: boolean },
  ) {
    client.broadcast.emit('userTyping', payload);
  }
}
