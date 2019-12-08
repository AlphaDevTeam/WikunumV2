import { ILocation } from 'app/shared/model/location.model';
import { IDocumentHistory } from 'app/shared/model/document-history.model';

export interface ISupplier {
  id?: number;
  supplierCode?: string;
  supplierName?: string;
  supplierCreditLimit?: number;
  isActive?: boolean;
  rating?: number;
  location?: ILocation;
  history?: IDocumentHistory;
}

export class Supplier implements ISupplier {
  constructor(
    public id?: number,
    public supplierCode?: string,
    public supplierName?: string,
    public supplierCreditLimit?: number,
    public isActive?: boolean,
    public rating?: number,
    public location?: ILocation,
    public history?: IDocumentHistory
  ) {
    this.isActive = this.isActive || false;
  }
}
