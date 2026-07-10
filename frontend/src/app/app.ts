import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TopBarComponent } from './dashboard/components/top-bar/top-bar';
import { SidebarComponent } from './dashboard/components/sidebar/sidebar';
import { ItemSheetComponent } from './dashboard/components/item-sheet/item-sheet';
import { DashboardService } from './dashboard/services/dashboard.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBarComponent, SidebarComponent, ItemSheetComponent],
  host: {
    '(document:keydown.escape)': 'onEscape()',
  },
  template: `
    <div class="flex h-screen bg-background">
      @if (service.mobileSidebarOpenRef()) {
        <div
          class="fixed inset-0 z-40 bg-black/50 lg:hidden"
          (click)="service.closeMobileSidebar()"
          aria-hidden="true"
        ></div>
      }

      <app-sidebar />

      <div class="flex flex-1 flex-col overflow-hidden">
        <app-top-bar />

        <main class="flex-1 overflow-y-auto">
          <router-outlet />
        </main>
      </div>

      <app-item-sheet />
    </div>
  `,
})
export class App {
  protected readonly service = inject(DashboardService);

  protected onEscape(): void {
    if (this.service.selectedItemIdRef()) {
      this.service.selectItem(null);
    } else {
      this.service.closeMobileSidebar();
    }
  }
}
