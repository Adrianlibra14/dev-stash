import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePin } from '@ng-icons/lucide';

import { CollectionCardComponent } from '../components/collection-card/collection-card';
import { ItemCardComponent } from '../components/item-card/item-card';
import { StatsCardComponent } from '../components/stats-card/stats-card';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [NgIcon, CollectionCardComponent, ItemCardComponent, StatsCardComponent],
  templateUrl: './dashboard.page.html',
  viewProviders: [provideIcons({ lucidePin })],
})
export class DashboardPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  protected readonly service = inject(DashboardService);

  protected readonly filteredItems = this.service.filteredItems;
  protected readonly selectedTypeId = this.service.selectedItemTypeIdRef;
  protected readonly itemTypes = this.service.itemTypes;

  protected readonly allItems = this.service.allItems;
  protected readonly collections = this.service.collections;
  protected readonly favoriteItems = this.service.favoriteItems;
  protected readonly favoriteCollections = this.service.favoriteCollections;
  protected readonly pinnedItems = this.service.pinnedItems;
  protected readonly recentItems = this.service.recentItems;
  protected readonly recentCollections = computed(() =>
    this.service.collectionsByRecency().slice(0, 5)
  );

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
