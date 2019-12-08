import { ILocation } from 'app/shared/model/location.model';

export interface IItemAddOns {
  id?: number;
  addonCode?: string;
  addonName?: string;
  addonDescription?: string;
  isActive?: boolean;
  allowSubstract?: boolean;
  addonPrice?: number;
  substractPrice?: number;
  imageContentType?: string;
  image?: any;
  location?: ILocation;
}

export class ItemAddOns implements IItemAddOns {
  constructor(
    public id?: number,
    public addonCode?: string,
    public addonName?: string,
    public addonDescription?: string,
    public isActive?: boolean,
    public allowSubstract?: boolean,
    public addonPrice?: number,
    public substractPrice?: number,
    public imageContentType?: string,
    public image?: any,
    public location?: ILocation
  ) {
    this.isActive = this.isActive || false;
    this.allowSubstract = this.allowSubstract || false;
  }
}
