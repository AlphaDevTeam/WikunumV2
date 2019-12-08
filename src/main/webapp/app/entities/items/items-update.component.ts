import { Component, OnInit, ElementRef } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IItems, Items } from 'app/shared/model/items.model';
import { ItemsService } from './items.service';
import { IDesigns } from 'app/shared/model/designs.model';
import { DesignsService } from 'app/entities/designs/designs.service';
import { IProducts } from 'app/shared/model/products.model';
import { ProductsService } from 'app/entities/products/products.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { IUOM } from 'app/shared/model/uom.model';
import { UOMService } from 'app/entities/uom/uom.service';
import { ICurrency } from 'app/shared/model/currency.model';
import { CurrencyService } from 'app/entities/currency/currency.service';
import { IItemAddOns } from 'app/shared/model/item-add-ons.model';
import { ItemAddOnsService } from 'app/entities/item-add-ons/item-add-ons.service';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from 'app/entities/document-history/document-history.service';

@Component({
  selector: 'jhi-items-update',
  templateUrl: './items-update.component.html'
})
export class ItemsUpdateComponent implements OnInit {
  isSaving: boolean;

  designs: IDesigns[];

  products: IProducts[];

  locations: ILocation[];

  uoms: IUOM[];

  currencies: ICurrency[];

  itemaddons: IItemAddOns[];

  documenthistories: IDocumentHistory[];
  originalStockDateDp: any;
  modifiedStockDateDp: any;

  editForm = this.fb.group({
    id: [],
    itemCode: [null, [Validators.required]],
    itemName: [null, [Validators.required]],
    itemDescription: [null, [Validators.required]],
    itemPrice: [],
    itemSerial: [null, [Validators.required]],
    itemSupplierSerial: [],
    itemCost: [null, [Validators.required]],
    originalStockDate: [null, [Validators.required]],
    modifiedStockDate: [null, [Validators.required]],
    image: [],
    imageContentType: [],
    relatedDesign: [null, Validators.required],
    relatedProduct: [null, Validators.required],
    location: [null, Validators.required],
    uOM: [null, Validators.required],
    currency: [null, Validators.required],
    addons: [],
    history: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected itemsService: ItemsService,
    protected designsService: DesignsService,
    protected productsService: ProductsService,
    protected locationService: LocationService,
    protected uOMService: UOMService,
    protected currencyService: CurrencyService,
    protected itemAddOnsService: ItemAddOnsService,
    protected documentHistoryService: DocumentHistoryService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ items }) => {
      this.updateForm(items);
    });
    this.designsService
      .query()
      .subscribe((res: HttpResponse<IDesigns[]>) => (this.designs = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.productsService
      .query()
      .subscribe((res: HttpResponse<IProducts[]>) => (this.products = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.locationService
      .query()
      .subscribe((res: HttpResponse<ILocation[]>) => (this.locations = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.uOMService
      .query()
      .subscribe((res: HttpResponse<IUOM[]>) => (this.uoms = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.currencyService
      .query()
      .subscribe((res: HttpResponse<ICurrency[]>) => (this.currencies = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.itemAddOnsService
      .query()
      .subscribe((res: HttpResponse<IItemAddOns[]>) => (this.itemaddons = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.documentHistoryService
      .query()
      .subscribe(
        (res: HttpResponse<IDocumentHistory[]>) => (this.documenthistories = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(items: IItems) {
    this.editForm.patchValue({
      id: items.id,
      itemCode: items.itemCode,
      itemName: items.itemName,
      itemDescription: items.itemDescription,
      itemPrice: items.itemPrice,
      itemSerial: items.itemSerial,
      itemSupplierSerial: items.itemSupplierSerial,
      itemCost: items.itemCost,
      originalStockDate: items.originalStockDate,
      modifiedStockDate: items.modifiedStockDate,
      image: items.image,
      imageContentType: items.imageContentType,
      relatedDesign: items.relatedDesign,
      relatedProduct: items.relatedProduct,
      location: items.location,
      uOM: items.uOM,
      currency: items.currency,
      addons: items.addons,
      history: items.history
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file: File = event.target.files[0];
        if (isImage && !file.type.startsWith('image/')) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      // eslint-disable-next-line no-console
      () => console.log('blob added'), // success
      this.onError
    );
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string) {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const items = this.createFromForm();
    if (items.id !== undefined) {
      this.subscribeToSaveResponse(this.itemsService.update(items));
    } else {
      this.subscribeToSaveResponse(this.itemsService.create(items));
    }
  }

  private createFromForm(): IItems {
    return {
      ...new Items(),
      id: this.editForm.get(['id']).value,
      itemCode: this.editForm.get(['itemCode']).value,
      itemName: this.editForm.get(['itemName']).value,
      itemDescription: this.editForm.get(['itemDescription']).value,
      itemPrice: this.editForm.get(['itemPrice']).value,
      itemSerial: this.editForm.get(['itemSerial']).value,
      itemSupplierSerial: this.editForm.get(['itemSupplierSerial']).value,
      itemCost: this.editForm.get(['itemCost']).value,
      originalStockDate: this.editForm.get(['originalStockDate']).value,
      modifiedStockDate: this.editForm.get(['modifiedStockDate']).value,
      imageContentType: this.editForm.get(['imageContentType']).value,
      image: this.editForm.get(['image']).value,
      relatedDesign: this.editForm.get(['relatedDesign']).value,
      relatedProduct: this.editForm.get(['relatedProduct']).value,
      location: this.editForm.get(['location']).value,
      uOM: this.editForm.get(['uOM']).value,
      currency: this.editForm.get(['currency']).value,
      addons: this.editForm.get(['addons']).value,
      history: this.editForm.get(['history']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItems>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackDesignsById(index: number, item: IDesigns) {
    return item.id;
  }

  trackProductsById(index: number, item: IProducts) {
    return item.id;
  }

  trackLocationById(index: number, item: ILocation) {
    return item.id;
  }

  trackUOMById(index: number, item: IUOM) {
    return item.id;
  }

  trackCurrencyById(index: number, item: ICurrency) {
    return item.id;
  }

  trackItemAddOnsById(index: number, item: IItemAddOns) {
    return item.id;
  }

  trackDocumentHistoryById(index: number, item: IDocumentHistory) {
    return item.id;
  }
}
