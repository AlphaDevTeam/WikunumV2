import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IJob, Job } from 'app/shared/model/job.model';
import { JobService } from './job.service';
import { IJobStatus } from 'app/shared/model/job-status.model';
import { JobStatusService } from 'app/entities/job-status/job-status.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer/customer.service';
import { IDocumentHistory } from 'app/shared/model/document-history.model';
import { DocumentHistoryService } from 'app/entities/document-history/document-history.service';
import { IWorker } from 'app/shared/model/worker.model';
import { WorkerService } from 'app/entities/worker/worker.service';

@Component({
  selector: 'jhi-job-update',
  templateUrl: './job-update.component.html'
})
export class JobUpdateComponent implements OnInit {
  isSaving: boolean;

  statuses: IJobStatus[];

  locations: ILocation[];

  customers: ICustomer[];

  documenthistories: IDocumentHistory[];

  workers: IWorker[];
  jobStartDateDp: any;
  jobEndDateDp: any;

  editForm = this.fb.group({
    id: [],
    jobCode: [null, [Validators.required]],
    jobDescription: [null, [Validators.required]],
    jobStartDate: [null, [Validators.required]],
    jobEndDate: [null, [Validators.required]],
    jobAmount: [null, [Validators.required]],
    status: [null, Validators.required],
    location: [null, Validators.required],
    customer: [null, Validators.required],
    history: [],
    assignedTos: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected jobService: JobService,
    protected jobStatusService: JobStatusService,
    protected locationService: LocationService,
    protected customerService: CustomerService,
    protected documentHistoryService: DocumentHistoryService,
    protected workerService: WorkerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ job }) => {
      this.updateForm(job);
    });
    this.jobStatusService.query({ 'jobId.specified': 'false' }).subscribe(
      (res: HttpResponse<IJobStatus[]>) => {
        if (!this.editForm.get('status').value || !this.editForm.get('status').value.id) {
          this.statuses = res.body;
        } else {
          this.jobStatusService
            .find(this.editForm.get('status').value.id)
            .subscribe(
              (subRes: HttpResponse<IJobStatus>) => (this.statuses = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.locationService
      .query()
      .subscribe((res: HttpResponse<ILocation[]>) => (this.locations = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.customerService
      .query()
      .subscribe((res: HttpResponse<ICustomer[]>) => (this.customers = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.documentHistoryService
      .query()
      .subscribe(
        (res: HttpResponse<IDocumentHistory[]>) => (this.documenthistories = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.workerService
      .query()
      .subscribe((res: HttpResponse<IWorker[]>) => (this.workers = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(job: IJob) {
    this.editForm.patchValue({
      id: job.id,
      jobCode: job.jobCode,
      jobDescription: job.jobDescription,
      jobStartDate: job.jobStartDate,
      jobEndDate: job.jobEndDate,
      jobAmount: job.jobAmount,
      status: job.status,
      location: job.location,
      customer: job.customer,
      history: job.history,
      assignedTos: job.assignedTos
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const job = this.createFromForm();
    if (job.id !== undefined) {
      this.subscribeToSaveResponse(this.jobService.update(job));
    } else {
      this.subscribeToSaveResponse(this.jobService.create(job));
    }
  }

  private createFromForm(): IJob {
    return {
      ...new Job(),
      id: this.editForm.get(['id']).value,
      jobCode: this.editForm.get(['jobCode']).value,
      jobDescription: this.editForm.get(['jobDescription']).value,
      jobStartDate: this.editForm.get(['jobStartDate']).value,
      jobEndDate: this.editForm.get(['jobEndDate']).value,
      jobAmount: this.editForm.get(['jobAmount']).value,
      status: this.editForm.get(['status']).value,
      location: this.editForm.get(['location']).value,
      customer: this.editForm.get(['customer']).value,
      history: this.editForm.get(['history']).value,
      assignedTos: this.editForm.get(['assignedTos']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJob>>) {
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

  trackJobStatusById(index: number, item: IJobStatus) {
    return item.id;
  }

  trackLocationById(index: number, item: ILocation) {
    return item.id;
  }

  trackCustomerById(index: number, item: ICustomer) {
    return item.id;
  }

  trackDocumentHistoryById(index: number, item: IDocumentHistory) {
    return item.id;
  }

  trackWorkerById(index: number, item: IWorker) {
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
