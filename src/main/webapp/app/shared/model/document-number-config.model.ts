import { IDocumentType } from 'app/shared/model/document-type.model';
import { ILocation } from 'app/shared/model/location.model';
import { IDocumentHistory } from 'app/shared/model/document-history.model';

export interface IDocumentNumberConfig {
  id?: number;
  documentPrefix?: string;
  documentPostfix?: string;
  currentNumber?: number;
  document?: IDocumentType;
  location?: ILocation;
  history?: IDocumentHistory;
}

export class DocumentNumberConfig implements IDocumentNumberConfig {
  constructor(
    public id?: number,
    public documentPrefix?: string,
    public documentPostfix?: string,
    public currentNumber?: number,
    public document?: IDocumentType,
    public location?: ILocation,
    public history?: IDocumentHistory
  ) {}
}
