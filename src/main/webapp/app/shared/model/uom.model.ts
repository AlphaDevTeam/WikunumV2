import { IDocumentHistory } from 'app/shared/model/document-history.model';

export interface IUOM {
  id?: number;
  uomCode?: string;
  uomDescription?: string;
  history?: IDocumentHistory;
}

export class UOM implements IUOM {
  constructor(public id?: number, public uomCode?: string, public uomDescription?: string, public history?: IDocumentHistory) {}
}
