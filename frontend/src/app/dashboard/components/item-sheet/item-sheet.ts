import { Component, computed, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideX, lucideStar, lucidePin, lucideTags } from '@ng-icons/lucide';

import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-item-sheet',
  imports: [NgIcon, ZardBadgeComponent],
  templateUrl: './item-sheet.html',
  viewProviders: [provideIcons({ lucideX, lucideStar, lucidePin, lucideTags })],
})
export class ItemSheetComponent {
  protected readonly service = inject(DashboardService);

  protected readonly isOpen = computed(() => !!this.service.selectedItem());

  protected readonly itemMeta = computed(() => this.service.itemWithMeta());

  protected readonly item = computed(() => this.itemMeta());

  close(): void {
    this.service.selectItem(null);
  }
}
