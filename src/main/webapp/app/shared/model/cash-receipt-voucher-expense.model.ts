import { Moment } from 'moment';
import { ILocation } from 'app/shared/model/location.model';
import { ITransactionType } from 'app/shared/model/transaction-type.model';
import { IExpense } from 'app/shared/model/expense.model';

export interface ICashReceiptVoucherExpense {
  id?: number;
  transactionDate?: Moment;
  transactionDescription?: string;
  transactionAmount?: number;
  location?: ILocation;
  transactionType?: ITransactionType;
  expense?: IExpense;
}

export class CashReceiptVoucherExpense implements ICashReceiptVoucherExpense {
  constructor(
    public id?: number,
    public transactionDate?: Moment,
    public transactionDescription?: string,
    public transactionAmount?: number,
    public location?: ILocation,
    public transactionType?: ITransactionType,
    public expense?: IExpense
  ) {}
}