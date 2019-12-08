import { Moment } from 'moment';
import { IDesigns } from 'app/shared/model/designs.model';
import { IProducts } from 'app/shared/model/products.model';
import { ILocation } from 'app/shared/model/location.model';
import { IUOM } from 'app/shared/model/uom.model';
import { ICurrency } from 'app/shared/model/currency.model';
import { IItemAddOns } from 'app/shared/model/item-add-ons.model';
import { IDocumentHistory } from 'app/shared/model/document-history.model';

export interface IItems {
  id?: number;
  itemCode?: string;
  itemName?: string;
  itemDescription?: string;
  itemPrice?: number;
  itemSerial?: string;
  itemSupplierSerial?: string;
  itemCost?: number;
  originalStockDate?: Moment;
  modifiedStockDate?: Moment;
  imageContentType?: string;
  image?: any;
  relatedDesign?: IDesigns;
  relatedProduct?: IProducts;
  location?: ILocation;
  uOM?: IUOM;
  currency?: ICurrency;
  addons?: IItemAddOns;
  history?: IDocumentHistory;
}

export class Items implements IItems {
  constructor(
    public id?: number,
    public itemCode?: string,
    public itemName?: string,
    public itemDescription?: string,
    public itemPrice?: number,
    public itemSerial?: string,
    public itemSupplierSerial?: string,
    public itemCost?: number,
    public originalStockDate?: Moment,
    public modifiedStockDate?: Moment,
    public imageContentType?: string,
    public image?: any,
    public relatedDesign?: IDesigns,
    public relatedProduct?: IProducts,
    public location?: ILocation,
    public uOM?: IUOM,
    public currency?: ICurrency,
    public addons?: IItemAddOns,
    public history?: IDocumentHistory
  ) {}
}
