import { ILocation } from 'app/shared/model/location.model';
import { IDocumentHistory } from 'app/shared/model/document-history.model';

export interface IProducts {
  id?: number;
  productCode?: string;
  productName?: string;
  productPrefix?: string;
  location?: ILocation;
  history?: IDocumentHistory;
}

export class Products implements IProducts {
  constructor(
    public id?: number,
    public productCode?: string,
    public productName?: string,
    public productPrefix?: string,
    public location?: ILocation,
    public history?: IDocumentHistory
  ) {}
}
