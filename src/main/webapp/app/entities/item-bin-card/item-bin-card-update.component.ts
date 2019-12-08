import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IItemBinCard, ItemBinCard } from 'app/shared/model/item-bin-card.model';
import { ItemBinCardService } from './item-bin-card.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { IItems } from 'app/shared/model/items.model';
import { ItemsService } from 'app/entities/items/items.service';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from 'app/entities/document-history/document-history.service';

@Component({
  selector: 'jhi-item-bin-card-update',
  templateUrl: './item-bin-card-update.component.html'
})
export class ItemBinCardUpdateComponent implements OnInit {
  isSaving: boolean;

  locations: ILocation[];

  items: IItems[];

  documenthistories: IDocumentHistory[];
  transactionDateDp: any;

  editForm = this.fb.group({
    id: [],
    transactionDate: [null, [Validators.required]],
    transactionDescription: [null, [Validators.required]],
    transactionQty: [null, [Validators.required]],
    transactionBalance: [null, [Validators.required]],
    location: [null, Validators.required],
    item: [null, Validators.required],
    history: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected itemBinCardService: ItemBinCardService,
    protected locationService: LocationService,
    protected itemsService: ItemsService,
    protected documentHistoryService: DocumentHistoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ itemBinCard }) => {
      this.updateForm(itemBinCard);
    });
    this.locationService
      .query()
      .subscribe((res: HttpResponse<ILocation[]>) => (this.locations = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.itemsService
      .query()
      .subscribe((res: HttpResponse<IItems[]>) => (this.items = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.documentHistoryService
      .query()
      .subscribe(
        (res: HttpResponse<IDocumentHistory[]>) => (this.documenthistories = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(itemBinCard: IItemBinCard) {
    this.editForm.patchValue({
      id: itemBinCard.id,
      transactionDate: itemBinCard.transactionDate,
      transactionDescription: itemBinCard.transactionDescription,
      transactionQty: itemBinCard.transactionQty,
      transactionBalance: itemBinCard.transactionBalance,
      location: itemBinCard.location,
      item: itemBinCard.item,
      history: itemBinCard.history
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const itemBinCard = this.createFromForm();
    if (itemBinCard.id !== undefined) {
      this.subscribeToSaveResponse(this.itemBinCardService.update(itemBinCard));
    } else {
      this.subscribeToSaveResponse(this.itemBinCardService.create(itemBinCard));
    }
  }

  private createFromForm(): IItemBinCard {
    return {
      ...new ItemBinCard(),
      id: this.editForm.get(['id']).value,
      transactionDate: this.editForm.get(['transactionDate']).value,
      transactionDescription: this.editForm.get(['transactionDescription']).value,
      transactionQty: this.editForm.get(['transactionQty']).value,
      transactionBalance: this.editForm.get(['transactionBalance']).value,
      location: this.editForm.get(['location']).value,
      item: this.editForm.get(['item']).value,
      history: this.editForm.get(['history']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemBinCard>>) {
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

  trackDocumentHistoryById(index: number, item: IDocumentHistory) {
    return item.id;
  }
}
