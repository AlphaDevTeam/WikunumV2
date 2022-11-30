import { IUserPermissions } from 'app/shared/model/user-permissions.model';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { IExUser } from 'app/shared/model/ex-user.model';

export interface IUserGroup {
  id?: number;
  groupName?: string;
  userPermissions?: IUserPermissions[];
  history?: IDocumentHistory;
  users?: IExUser[];
}

export class UserGroup implements IUserGroup {
  constructor(
    public id?: number,
    public groupName?: string,
    public userPermissions?: IUserPermissions[],
    public history?: IDocumentHistory,
    public users?: IExUser[]
  ) {}
}
