import { OperationType } from "./../../entities/Statement";

export interface ITransferDTO {
  sender_id: string;
  receiver_id: string;
  description: string;
  amount: number;
  type: OperationType;
}
