import { Moment } from 'moment';
import { ILocation } from 'app/shared/model/location.model';
import { ITransactionType } from 'app/shared/model/transaction-type.model';
import { ISupplier } from 'app/shared/model/supplier.model';
import { IDocumentHistory } from 'app/shared/model/document-history.model';

export interface ICashPaymentVoucherSupplier {
  id?: number;
  transactionDate?: Moment;
  transactionDescription?: string;
  transactionAmount?: number;
  location?: ILocation;
  transactionType?: ITransactionType;
  supplier?: ISupplier;
  history?: IDocumentHistory;
}

export class CashPaymentVoucherSupplier implements ICashPaymentVoucherSupplier {
  constructor(
    public id?: number,
    public transactionDate?: Moment,
    public transactionDescription?: string,
    public transactionAmount?: number,
    public location?: ILocation,
    public transactionType?: ITransactionType,
    public supplier?: ISupplier,
    public history?: IDocumentHistory
  ) {}
}
