import { IDocumentHistory } from 'app/shared/model/document-history.model';

export interface ITransactionType {
  id?: number;
  transactionypeCode?: string;
  transactionType?: string;
  isActive?: boolean;
  history?: IDocumentHistory;
}

export class TransactionType implements ITransactionType {
  constructor(
    public id?: number,
    public transactionypeCode?: string,
    public transactionType?: string,
    public isActive?: boolean,
    public history?: IDocumentHistory
  ) {
    this.isActive = this.isActive || false;
  }
}
