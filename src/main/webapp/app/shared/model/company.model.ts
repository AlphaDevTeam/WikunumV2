import { IDocumentHistory } from 'app/shared/model/document-history.model';

export interface ICompany {
  id?: number;
  companyCode?: string;
  companyName?: string;
  companyRegNumber?: string;
  rating?: number;
  history?: IDocumentHistory;
}

export class Company implements ICompany {
  constructor(
    public id?: number,
    public companyCode?: string,
    public companyName?: string,
    public companyRegNumber?: string,
    public rating?: number,
    public history?: IDocumentHistory
  ) {}
}
