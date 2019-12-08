import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WikunumV2SharedModule } from 'app/shared/shared.module';
import { DesignsComponent } from './designs.component';
import { DesignsDetailComponent } from './designs-detail.component';
import { DesignsUpdateComponent } from './designs-update.component';
import { DesignsDeleteDialogComponent } from './designs-delete-dialog.component';
import { designsRoute } from './designs.route';

@NgModule({
  imports: [WikunumV2SharedModule, RouterModule.forChild(designsRoute)],
  declarations: [DesignsComponent, DesignsDetailComponent, DesignsUpdateComponent, DesignsDeleteDialogComponent],
  entryComponents: [DesignsDeleteDialogComponent]
})
export class WikunumV2DesignsModule {}
