import { IUser } from 'app/core/user/user.model';
import { ICompany } from 'app/shared/model/company.model';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { ILocation } from 'app/shared/model/location.model';
import { IUserGroup } from 'app/shared/model/user-group.model';

export interface IExUser {
  id?: number;
  userKey?: string;
  relatedUser?: IUser;
  company?: ICompany;
  history?: IDocumentHistory;
  locations?: ILocation[];
  userGroups?: IUserGroup[];
}

export class ExUser implements IExUser {
  constructor(
    public id?: number,
    public userKey?: string,
    public relatedUser?: IUser,
    public company?: ICompany,
    public history?: IDocumentHistory,
    public locations?: ILocation[],
    public userGroups?: IUserGroup[]
  ) {}
}
