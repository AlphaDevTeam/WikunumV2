import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStorageBin } from 'app/shared/model/storage-bin.model';

@Component({
  selector: 'jhi-storage-bin-detail',
  templateUrl: './storage-bin-detail.component.html'
})
export class StorageBinDetailComponent implements OnInit {
  storageBin: IStorageBin;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ storageBin }) => {
      this.storageBin = storageBin;
    });
  }

  previousState() {
    window.history.back();
  }
}
