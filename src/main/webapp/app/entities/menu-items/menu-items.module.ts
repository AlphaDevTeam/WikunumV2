import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WikunumV2SharedModule } from 'app/shared/shared.module';
import { MenuItemsComponent } from './menu-items.component';
import { MenuItemsDetailComponent } from './menu-items-detail.component';
import { MenuItemsUpdateComponent } from './menu-items-update.component';
import { MenuItemsDeleteDialogComponent } from './menu-items-delete-dialog.component';
import { menuItemsRoute } from './menu-items.route';

@NgModule({
  imports: [WikunumV2SharedModule, RouterModule.forChild(menuItemsRoute)],
  declarations: [MenuItemsComponent, MenuItemsDetailComponent, MenuItemsUpdateComponent, MenuItemsDeleteDialogComponent],
  entryComponents: [MenuItemsDeleteDialogComponent]
})
export class WikunumV2MenuItemsModule {}
