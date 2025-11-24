export interface ChatMessage {
  sender: 'user' | 'agent' | 'system';
  content: string;
}