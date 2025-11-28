
export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}

export interface Suggestion {
  id: string;
  title: string;
  icon: 'map' | 'compass' | 'dollar' | 'calendar' | 'mountain' | 'coffee' | 'sun';
  prompt: string;
}

export enum ViewState {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD'
}
