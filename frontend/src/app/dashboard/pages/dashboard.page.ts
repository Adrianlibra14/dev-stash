import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CollectionCardComponent } from '../components/collection-card/collection-card';
import { ItemCardComponent } from '../components/item-card/item-card';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [CollectionCardComponent, ItemCardComponent],
  templateUrl: './dashboard.page.html',
})
export class DashboardPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  protected readonly service = inject(DashboardService);

  protected readonly collections = this.service.collections;
  protected readonly filteredItems = this.service.filteredItems;
  protected readonly selectedTypeId = this.service.selectedItemTypeIdRef;
  protected readonly itemTypes = this.service.itemTypes;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const typeSlug = params.get('typeSlug');
      if (typeSlug) {
        this.service.selectItemTypeBySlug(typeSlug);
      } else {
        this.service.selectItemType(null);
      }
    });
  }

  openItem(itemId: string): void {
    this.service.selectItem(itemId);
  }

  getItemType(typeId: string) {
    return this.itemTypes().find(t => t.id === typeId);
  }
}
