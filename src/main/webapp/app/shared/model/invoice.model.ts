import { Moment } from 'moment';
import { IInvoiceDetails } from 'app/shared/model/invoice-details.model';
import { IItems } from 'app/shared/model/items.model';
import { IDocumentHistory } from 'app/shared/model/document-history.model';

export interface IInvoice {
  id?: number;
  invNumber?: string;
  invDate?: Moment;
  details?: IInvoiceDetails[];
  item?: IItems;
  history?: IDocumentHistory;
}

export class Invoice implements IInvoice {
  constructor(
    public id?: number,
    public invNumber?: string,
    public invDate?: Moment,
    public details?: IInvoiceDetails[],
    public item?: IItems,
    public history?: IDocumentHistory
  ) {}
}
