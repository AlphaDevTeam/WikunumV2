import { IDocumentType } from 'app/shared/model/document-type.model';
import { ILocation } from 'app/shared/model/location.model';
import { ITransactionType } from 'app/shared/model/transaction-type.model';
import { IDocumentHistory } from 'app/shared/model/document-history.model';

export interface IDocumentNumberConfig {
  id?: number;
  documentPrefix?: string;
  documentPostfix?: string;
  currentNumber?: number;
  document?: IDocumentType;
  location?: ILocation;
  transactionType?: ITransactionType;
  history?: IDocumentHistory;
}

export class DocumentNumberConfig implements IDocumentNumberConfig {
  constructor(
    public id?: number,
    public documentPrefix?: string,
    public documentPostfix?: string,
    public currentNumber?: number,
    public document?: IDocumentType,
    public location?: ILocation,
    public transactionType?: ITransactionType,
    public history?: IDocumentHistory
  ) {}
}
