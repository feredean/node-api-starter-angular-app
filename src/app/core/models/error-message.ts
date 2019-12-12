interface Error {
  msg: string;
}

interface Message {
  errors: Error[];
}

export interface ServerErrors {
  status: number;
  message: Message;
}
