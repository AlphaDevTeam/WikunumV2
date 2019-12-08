import { Moment } from 'moment';
import { ILocation } from 'app/shared/model/location.model';
import { ITransactionType } from 'app/shared/model/transaction-type.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { IDocumentHistory } from 'app/shared/model/document-history.model';

export interface ICashReceiptVoucherCustomer {
  id?: number;
  transactionDate?: Moment;
  transactionDescription?: string;
  transactionAmount?: number;
  location?: ILocation;
  transactionType?: ITransactionType;
  customer?: ICustomer;
  history?: IDocumentHistory;
}

export class CashReceiptVoucherCustomer implements ICashReceiptVoucherCustomer {
  constructor(
    public id?: number,
    public transactionDate?: Moment,
    public transactionDescription?: string,
    public transactionAmount?: number,
    public location?: ILocation,
    public transactionType?: ITransactionType,
    public customer?: ICustomer,
    public history?: IDocumentHistory
  ) {}
}
