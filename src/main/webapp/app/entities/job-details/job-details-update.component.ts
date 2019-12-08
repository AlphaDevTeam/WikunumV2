import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IJobDetails, JobDetails } from 'app/shared/model/job-details.model';
import { JobDetailsService } from './job-details.service';
import { IItems } from 'app/shared/model/items.model';
import { ItemsService } from 'app/entities/items/items.service';
import { IJob } from 'app/shared/model/job.model';
import { JobService } from 'app/entities/job/job.service';

@Component({
  selector: 'jhi-job-details-update',
  templateUrl: './job-details-update.component.html'
})
export class JobDetailsUpdateComponent implements OnInit {
  isSaving: boolean;

  items: IItems[];

  jobs: IJob[];

  editForm = this.fb.group({
    id: [],
    jobItemPrice: [null, [Validators.required]],
    jobItemQty: [null, [Validators.required]],
    item: [null, Validators.required],
    job: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected jobDetailsService: JobDetailsService,
    protected itemsService: ItemsService,
    protected jobService: JobService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ jobDetails }) => {
      this.updateForm(jobDetails);
    });
    this.itemsService
      .query()
      .subscribe((res: HttpResponse<IItems[]>) => (this.items = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.jobService
      .query()
      .subscribe((res: HttpResponse<IJob[]>) => (this.jobs = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(jobDetails: IJobDetails) {
    this.editForm.patchValue({
      id: jobDetails.id,
      jobItemPrice: jobDetails.jobItemPrice,
      jobItemQty: jobDetails.jobItemQty,
      item: jobDetails.item,
      job: jobDetails.job
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const jobDetails = this.createFromForm();
    if (jobDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.jobDetailsService.update(jobDetails));
    } else {
      this.subscribeToSaveResponse(this.jobDetailsService.create(jobDetails));
    }
  }

  private createFromForm(): IJobDetails {
    return {
      ...new JobDetails(),
      id: this.editForm.get(['id']).value,
      jobItemPrice: this.editForm.get(['jobItemPrice']).value,
      jobItemQty: this.editForm.get(['jobItemQty']).value,
      item: this.editForm.get(['item']).value,
      job: this.editForm.get(['job']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobDetails>>) {
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

  trackItemsById(index: number, item: IItems) {
    return item.id;
  }

  trackJobById(index: number, item: IJob) {
    return item.id;
  }
}
