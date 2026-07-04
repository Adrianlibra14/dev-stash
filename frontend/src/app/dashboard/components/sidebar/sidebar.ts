import { Component, computed, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCode,
  lucideSparkles,
  lucideTerminal,
  lucideStickyNote,
  lucideFile,
  lucideImage,
  lucideLink,
  lucideChevronLeft,
  lucideFolders,
} from '@ng-icons/lucide';

import { DashboardService } from '../../services/dashboard.service';

const ICON_MAP: Record<string, string> = {
  Code: 'lucideCode',
  Sparkles: 'lucideSparkles',
  Terminal: 'lucideTerminal',
  StickyNote: 'lucideStickyNote',
  File: 'lucideFile',
  Image: 'lucideImage',
  Link: 'lucideLink',
};

@Component({
  selector: 'app-sidebar',
  imports: [NgIcon],
  templateUrl: './sidebar.html',
  viewProviders: [
    provideIcons({
      lucideCode,
      lucideSparkles,
      lucideTerminal,
      lucideStickyNote,
      lucideFile,
      lucideImage,
      lucideLink,
      lucideChevronLeft,
      lucideFolders,
    }),
  ],
})
export class SidebarComponent {
  protected readonly service = inject(DashboardService);

  protected readonly collapsed = this.service.sidebarCollapsedRef;
  protected readonly itemTypes = this.service.itemTypes;
  protected readonly collections = this.service.collections;
  protected readonly selectedTypeId = this.service.selectedItemTypeIdRef;

  protected readonly getIconName = (icon: string): string => ICON_MAP[icon] ?? 'lucideCode';

  protected readonly selectedCount = computed(() => {
    const typeId = this.selectedTypeId();
    if (!typeId) return 0;
    return this.service.allItems().filter(i => i.itemTypeId === typeId).length;
  });

  selectType(typeId: string | null): void {
    this.service.selectItemType(typeId === this.selectedTypeId() ? null : typeId);
  }

  toggleSidebar(): void {
    this.service.toggleSidebar();
  }
}
