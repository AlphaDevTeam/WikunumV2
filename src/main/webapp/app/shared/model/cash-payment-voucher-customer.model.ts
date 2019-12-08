import { Moment } from 'moment';
import { ILocation } from 'app/shared/model/location.model';
import { ITransactionType } from 'app/shared/model/transaction-type.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { IDocumentHistory } from 'app/shared/model/document-history.model';

export interface ICashPaymentVoucherCustomer {
  id?: number;
  transactionDate?: Moment;
  transactionDescription?: string;
  transactionAmountDR?: number;
  transactionAmountCR?: number;
  location?: ILocation;
  transactionType?: ITransactionType;
  customer?: ICustomer;
  history?: IDocumentHistory;
}

export class CashPaymentVoucherCustomer implements ICashPaymentVoucherCustomer {
  constructor(
    public id?: number,
    public transactionDate?: Moment,
    public transactionDescription?: string,
    public transactionAmountDR?: number,
    public transactionAmountCR?: number,
    public location?: ILocation,
    public transactionType?: ITransactionType,
    public customer?: ICustomer,
    public history?: IDocumentHistory
  ) {}
}
