import { Component, inject } from '@angular/core';

import { TopBarComponent } from '../components/top-bar/top-bar';
import { SidebarComponent } from '../components/sidebar/sidebar';
import { CollectionCardComponent } from '../components/collection-card/collection-card';
import { ItemCardComponent } from '../components/item-card/item-card';
import { ItemSheetComponent } from '../components/item-sheet/item-sheet';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [TopBarComponent, SidebarComponent, CollectionCardComponent, ItemCardComponent, ItemSheetComponent],
  templateUrl: './dashboard.page.html',
})
export class DashboardPage {
  protected readonly service = inject(DashboardService);

  protected readonly collections = this.service.collections;
  protected readonly filteredItems = this.service.filteredItems;
  protected readonly selectedTypeId = this.service.selectedItemTypeIdRef;
  protected readonly itemTypes = this.service.itemTypes;

  openItem(itemId: string): void {
    this.service.selectItem(itemId);
  }

  getItemType(typeId: string) {
    return this.itemTypes().find(t => t.id === typeId);
  }
}
