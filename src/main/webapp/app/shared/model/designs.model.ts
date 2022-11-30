import { IProducts } from 'app/shared/model/products.model';
import { ILocation } from 'app/shared/model/location.model';
import { IDocumentHistory } from 'app/shared/model/document-history.model';

export interface IDesigns {
  id?: number;
  designCode?: string;
  designName?: string;
  designPrefix?: string;
  relatedProduct?: IProducts;
  location?: ILocation;
  history?: IDocumentHistory;
}

export class Designs implements IDesigns {
  constructor(
    public id?: number,
    public designCode?: string,
    public designName?: string,
    public designPrefix?: string,
    public relatedProduct?: IProducts,
    public location?: ILocation,
    public history?: IDocumentHistory
  ) {}
}
