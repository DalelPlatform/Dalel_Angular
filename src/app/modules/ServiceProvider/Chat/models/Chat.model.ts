import { Message } from "./Message.model";

export interface Chat {
  Id: number;
  ClientId: string;
  ServiceProviderId: string;
  LastMessageAt: Date;
  messages?: Message[]; 
}
