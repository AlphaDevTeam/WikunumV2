import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ILocation, Location } from 'app/shared/model/location.model';
import { LocationService } from './location.service';
import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from 'app/entities/company/company.service';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from 'app/entities/document-history/document-history.service';
import { IExUser } from 'app/shared/model/ex-user.model';
import { ExUserService } from 'app/entities/ex-user/ex-user.service';

@Component({
  selector: 'jhi-location-update',
  templateUrl: './location-update.component.html'
})
export class LocationUpdateComponent implements OnInit {
  isSaving: boolean;

  companies: ICompany[];

  documenthistories: IDocumentHistory[];

  exusers: IExUser[];

  editForm = this.fb.group({
    id: [],
    locationCode: [null, [Validators.required]],
    locationName: [null, [Validators.required]],
    isActive: [],
    company: [null, Validators.required],
    history: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected locationService: LocationService,
    protected companyService: CompanyService,
    protected documentHistoryService: DocumentHistoryService,
    protected exUserService: ExUserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ location }) => {
      this.updateForm(location);
    });
    this.companyService
      .query()
      .subscribe((res: HttpResponse<ICompany[]>) => (this.companies = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.documentHistoryService
      .query()
      .subscribe(
        (res: HttpResponse<IDocumentHistory[]>) => (this.documenthistories = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.exUserService
      .query()
      .subscribe((res: HttpResponse<IExUser[]>) => (this.exusers = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(location: ILocation) {
    this.editForm.patchValue({
      id: location.id,
      locationCode: location.locationCode,
      locationName: location.locationName,
      isActive: location.isActive,
      company: location.company,
      history: location.history
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const location = this.createFromForm();
    if (location.id !== undefined) {
      this.subscribeToSaveResponse(this.locationService.update(location));
    } else {
      this.subscribeToSaveResponse(this.locationService.create(location));
    }
  }

  private createFromForm(): ILocation {
    return {
      ...new Location(),
      id: this.editForm.get(['id']).value,
      locationCode: this.editForm.get(['locationCode']).value,
      locationName: this.editForm.get(['locationName']).value,
      isActive: this.editForm.get(['isActive']).value,
      company: this.editForm.get(['company']).value,
      history: this.editForm.get(['history']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocation>>) {
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

  trackCompanyById(index: number, item: ICompany) {
    return item.id;
  }

  trackDocumentHistoryById(index: number, item: IDocumentHistory) {
    return item.id;
  }

  trackExUserById(index: number, item: IExUser) {
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
