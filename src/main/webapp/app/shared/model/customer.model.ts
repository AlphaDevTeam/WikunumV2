import { ILocation } from 'app/shared/model/location.model';
import { IDocumentHistory } from 'app/shared/model/document-history.model';

export interface ICustomer {
  id?: number;
  customerCode?: string;
  customerName?: string;
  customerCreditLimit?: number;
  isActive?: boolean;
  rating?: number;
  location?: ILocation;
  history?: IDocumentHistory;
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public customerCode?: string,
    public customerName?: string,
    public customerCreditLimit?: number,
    public isActive?: boolean,
    public rating?: number,
    public location?: ILocation,
    public history?: IDocumentHistory
  ) {
    this.isActive = this.isActive || false;
  }
}
