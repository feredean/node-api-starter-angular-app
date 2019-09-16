interface Error {
  msg: string;
}

interface Message {
  errors: Error[];
}

export interface ErrorMessage {
  status: number;
  message: string;
}

export interface ServerErrors {
  status: number;
  message: Message;
}