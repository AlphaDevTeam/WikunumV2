import { IItems } from 'app/shared/model/items.model';
import { ILocation } from 'app/shared/model/location.model';
import { ICompany } from 'app/shared/model/company.model';
import { ITransactionType } from 'app/shared/model/transaction-type.model';
import { IDocumentHistory } from 'app/shared/model/document-history.model';

export interface IStock {
  id?: number;
  stockQty?: number;
  item?: IItems;
  location?: ILocation;
  company?: ICompany;
  transactionType?: ITransactionType;
  history?: IDocumentHistory;
}

export class Stock implements IStock {
  constructor(
    public id?: number,
    public stockQty?: number,
    public item?: IItems,
    public location?: ILocation,
    public company?: ICompany,
    public transactionType?: ITransactionType,
    public history?: IDocumentHistory
  ) {}
}
