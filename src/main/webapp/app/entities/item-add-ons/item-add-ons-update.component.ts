import { Component, OnInit, ElementRef } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IItemAddOns, ItemAddOns } from 'app/shared/model/item-add-ons.model';
import { ItemAddOnsService } from './item-add-ons.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { IItems } from 'app/shared/model/items.model';
import { ItemsService } from 'app/entities/items/items.service';

@Component({
  selector: 'jhi-item-add-ons-update',
  templateUrl: './item-add-ons-update.component.html'
})
export class ItemAddOnsUpdateComponent implements OnInit {
  isSaving: boolean;

  locations: ILocation[];

  items: IItems[];

  editForm = this.fb.group({
    id: [],
    addonCode: [null, [Validators.required]],
    addonName: [null, [Validators.required]],
    addonDescription: [],
    isActive: [],
    allowSubstract: [],
    addonPrice: [],
    substractPrice: [],
    image: [],
    imageContentType: [],
    location: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected itemAddOnsService: ItemAddOnsService,
    protected locationService: LocationService,
    protected itemsService: ItemsService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ itemAddOns }) => {
      this.updateForm(itemAddOns);
    });
    this.locationService
      .query()
      .subscribe((res: HttpResponse<ILocation[]>) => (this.locations = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.itemsService
      .query()
      .subscribe((res: HttpResponse<IItems[]>) => (this.items = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(itemAddOns: IItemAddOns) {
    this.editForm.patchValue({
      id: itemAddOns.id,
      addonCode: itemAddOns.addonCode,
      addonName: itemAddOns.addonName,
      addonDescription: itemAddOns.addonDescription,
      isActive: itemAddOns.isActive,
      allowSubstract: itemAddOns.allowSubstract,
      addonPrice: itemAddOns.addonPrice,
      substractPrice: itemAddOns.substractPrice,
      image: itemAddOns.image,
      imageContentType: itemAddOns.imageContentType,
      location: itemAddOns.location
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
    const itemAddOns = this.createFromForm();
    if (itemAddOns.id !== undefined) {
      this.subscribeToSaveResponse(this.itemAddOnsService.update(itemAddOns));
    } else {
      this.subscribeToSaveResponse(this.itemAddOnsService.create(itemAddOns));
    }
  }

  private createFromForm(): IItemAddOns {
    return {
      ...new ItemAddOns(),
      id: this.editForm.get(['id']).value,
      addonCode: this.editForm.get(['addonCode']).value,
      addonName: this.editForm.get(['addonName']).value,
      addonDescription: this.editForm.get(['addonDescription']).value,
      isActive: this.editForm.get(['isActive']).value,
      allowSubstract: this.editForm.get(['allowSubstract']).value,
      addonPrice: this.editForm.get(['addonPrice']).value,
      substractPrice: this.editForm.get(['substractPrice']).value,
      imageContentType: this.editForm.get(['imageContentType']).value,
      image: this.editForm.get(['image']).value,
      location: this.editForm.get(['location']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemAddOns>>) {
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

  trackLocationById(index: number, item: ILocation) {
    return item.id;
  }

  trackItemsById(index: number, item: IItems) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
