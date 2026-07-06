import { Component, computed, inject, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideStar } from '@ng-icons/lucide';

import type { MockCollection, MockItemType } from '../../../../mock/mock-data';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-collection-card',
  imports: [NgIcon],
  templateUrl: './collection-card.html',
  viewProviders: [provideIcons({ lucideStar })],
})
export class CollectionCardComponent {
  private readonly service = inject(DashboardService);

  readonly collection = input.required<MockCollection>();

  protected readonly defaultType = computed<MockItemType | null>(() => {
    if (!this.collection().defaultTypeId) return null;
    return this.service.itemTypes().find(t => t.id === this.collection().defaultTypeId) ?? null;
  });

  protected readonly itemCount = computed(() => {
    return this.service.allItems().filter(i => i.collectionIds.includes(this.collection().id)).length;
  });

  protected readonly dominantColor = computed(() => {
    const type = this.defaultType();
    if (type) return type.color;
    const collectionItems = this.service.allItems().filter(i => i.collectionIds.includes(this.collection().id));
    if (collectionItems.length === 0) return '#6b7280';
    const typeCounts = new Map<string, number>();
    for (const item of collectionItems) {
      typeCounts.set(item.itemTypeId, (typeCounts.get(item.itemTypeId) ?? 0) + 1);
    }
    let maxTypeId = collectionItems[0].itemTypeId;
    let maxCount = 0;
    for (const [typeId, count] of typeCounts) {
      if (count > maxCount) {
        maxCount = count;
        maxTypeId = typeId;
      }
    }
    return this.service.itemTypes().find(t => t.id === maxTypeId)?.color ?? '#6b7280';
  });
}
