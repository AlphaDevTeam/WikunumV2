import { IInvoice } from 'app/shared/model/invoice.model';

export interface IInvoiceDetails {
  id?: number;
  invQty?: string;
  revisedItemSalesPrice?: number;
  inv?: IInvoice;
}

export class InvoiceDetails implements IInvoiceDetails {
  constructor(public id?: number, public invQty?: string, public revisedItemSalesPrice?: number, public inv?: IInvoice) {}
}
