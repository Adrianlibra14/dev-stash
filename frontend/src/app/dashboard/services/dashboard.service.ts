import { Service, computed, signal } from '@angular/core';
import type { MockCollection, MockItem, MockItemType, MockUser } from '../../../mock/mock-data';
import { collections, currentUser, items, itemTypes } from '../../../mock/mock-data';

export interface ItemWithMeta extends MockItem {
  itemType: MockItemType;
  collections: MockCollection[];
}

@Service()
export class DashboardService {
  private readonly selectedItemTypeId = signal<string | null>(null);
  private readonly selectedItemId = signal<string | null>(null);
  private readonly sidebarCollapsed = signal(false);
  private readonly mobileSidebarOpen = signal(false);

  readonly user = signal<MockUser>(currentUser);
  readonly itemTypes = signal<MockItemType[]>(itemTypes);
  readonly collections = signal<MockCollection[]>(collections);
  readonly allItems = signal<MockItem[]>(items);

  readonly selectedItemTypeIdRef = this.selectedItemTypeId.asReadonly();
  readonly selectedItemIdRef = this.selectedItemId.asReadonly();
  readonly sidebarCollapsedRef = this.sidebarCollapsed.asReadonly();
  readonly mobileSidebarOpenRef = this.mobileSidebarOpen.asReadonly();

  readonly filteredItems = computed(() => {
    const typeId = this.selectedItemTypeId();
    if (!typeId) return this.allItems();
    return this.allItems().filter(i => i.itemTypeId === typeId);
  });

  readonly selectedItem = computed(() => {
    const id = this.selectedItemId();
    if (!id) return null;
    return this.allItems().find(i => i.id === id) ?? null;
  });

  readonly itemWithMeta = computed<ItemWithMeta | null>(() => {
    const item = this.selectedItem();
    if (!item) return null;
    const itemType = this.itemTypes().find(t => t.id === item.itemTypeId) ?? this.itemTypes()[0];
    const itemCollections = this.collections().filter(c => item.collectionIds.includes(c.id));
    return { ...item, itemType, collections: itemCollections };
  });

  readonly favoriteCollections = computed(() =>
    this.collections().filter(c => c.isFavorite)
  );

  readonly recentCollections = computed(() =>
    [...this.collections()]
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, 3)
  );

  getItemCountByType(typeId: string): number {
    return this.allItems().filter(i => i.itemTypeId === typeId).length;
  }

  getCollectionItemCount(collectionId: string): number {
    return this.allItems().filter(i => i.collectionIds.includes(collectionId)).length;
  }

  selectItemType(typeId: string | null): void {
    this.selectedItemTypeId.set(typeId);
  }

  selectItemTypeBySlug(slug: string | null): void {
    if (!slug) {
      this.selectedItemTypeId.set(null);
      return;
    }
    const type = this.itemTypes().find(t => t.slug === slug);
    this.selectedItemTypeId.set(type?.id ?? null);
  }

  selectItem(itemId: string | null): void {
    this.selectedItemId.set(itemId);
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }

  toggleMobileSidebar(): void {
    this.mobileSidebarOpen.update(v => !v);
  }

  closeMobileSidebar(): void {
    this.mobileSidebarOpen.set(false);
  }
}
