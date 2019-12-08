export interface IChangeLog {
  id?: number;
  changeKey?: string;
  changeFrom?: string;
  changeTo?: string;
}

export class ChangeLog implements IChangeLog {
  constructor(public id?: number, public changeKey?: string, public changeFrom?: string, public changeTo?: string) {}
}
