import { ICompany } from 'app/shared/model/company.model';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { IExUser } from 'app/shared/model/ex-user.model';

export interface ILocation {
  id?: number;
  locationCode?: string;
  locationName?: string;
  isActive?: boolean;
  company?: ICompany;
  history?: IDocumentHistory;
  users?: IExUser[];
}

export class Location implements ILocation {
  constructor(
    public id?: number,
    public locationCode?: string,
    public locationName?: string,
    public isActive?: boolean,
    public company?: ICompany,
    public history?: IDocumentHistory,
    public users?: IExUser[]
  ) {
    this.isActive = this.isActive || false;
  }
}
