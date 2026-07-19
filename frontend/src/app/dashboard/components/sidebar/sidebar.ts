import { Component, computed, ElementRef, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCode,
  lucideSparkles,
  lucideTerminal,
  lucideStickyNote,
  lucideFile,
  lucideImage,
  lucideLink,
      lucidePanelLeft,
  lucideChevronDown,
  lucideFolders,
  lucideStar,
  lucideSettings,
  lucidePlus,
  lucideUser,
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
  imports: [NgIcon, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styles: [`:host { display: contents; }`],
  viewProviders: [
    provideIcons({
      lucideCode,
      lucideSparkles,
      lucideTerminal,
      lucideStickyNote,
      lucideFile,
      lucideImage,
      lucideLink,
  lucidePanelLeft,
      lucideChevronDown,
      lucideFolders,
      lucideStar,
      lucideSettings,
      lucidePlus,
      lucideUser,
    }),
  ],
})
export class SidebarComponent {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  protected readonly service = inject(DashboardService);

  private resizeTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    window.addEventListener('resize', () => this.preventResizeAnimation());
  }

  private preventResizeAnimation(): void {
    const aside = this.elementRef.nativeElement.querySelector('aside');
    if (!aside) return;
    aside.style.transition = 'none';
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      aside.style.transition = '';
    }, 150);
  }

  protected readonly collapsed = this.service.sidebarCollapsedRef;
  protected readonly mobileOpen = this.service.mobileSidebarOpenRef;
  protected readonly itemTypes = this.service.itemTypes;
  protected readonly collections = this.service.collections;
  protected readonly favoriteCollections = this.service.favoriteCollections;
  protected readonly recentCollections = this.service.recentCollections;
  protected readonly user = this.service.user;

  protected readonly itemTypesOpen = signal(true);
  protected readonly collectionsOpen = signal(true);
  protected readonly favoritesOpen = signal(true);
  protected readonly allCollectionsOpen = signal(true);
  protected readonly recentCollectionsOpen = signal(true);

  protected readonly getIconName = (icon: string): string => ICON_MAP[icon] ?? 'lucideCode';

  protected readonly userInitials = computed(() => {
    const name = this.user().displayName || this.user().email || 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  });

  protected readonly userAvatarColor = computed(() => {
    const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f97316', '#ec4899', '#06b6d4'];
    const hash = this.user().id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return colors[hash % colors.length];
  });

  getItemCount(typeId: string): number {
    return this.service.getItemCountByType(typeId);
  }

  getCollectionCount(collectionId: string): number {
    return this.service.getCollectionItemCount(collectionId);
  }

  toggleSidebar(): void {
    if (this.mobileOpen()) {
      this.service.closeMobileSidebar();
    } else {
      this.service.toggleSidebar();
    }
  }

  toggleMobileSidebar(): void {
    this.service.toggleMobileSidebar();
  }

  closeMobileSidebar(): void {
    this.service.closeMobileSidebar();
  }

  toggleItemTypes(): void {
    this.itemTypesOpen.update(v => !v);
  }

  toggleCollections(): void {
    this.collectionsOpen.update(v => !v);
  }

  toggleFavorites(): void {
    this.favoritesOpen.update(v => !v);
  }

  toggleAllCollections(): void {
    this.allCollectionsOpen.update(v => !v);
  }

  toggleRecentCollections(): void {
    this.recentCollectionsOpen.update(v => !v);
  }
}
