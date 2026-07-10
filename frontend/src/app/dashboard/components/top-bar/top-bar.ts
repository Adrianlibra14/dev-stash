import { Component, inject, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch, lucidePlus, lucideMenu } from '@ng-icons/lucide';

import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-top-bar',
  imports: [NgIcon, ZardButtonComponent, ZardInputDirective],
  templateUrl: './top-bar.html',
  viewProviders: [
    provideIcons({
      lucideSearch,
      lucidePlus,
      lucideMenu,
    }),
  ],
})
export class TopBarComponent {
  protected readonly service = inject(DashboardService);

  protected readonly searchPlaceholder = signal('Search code body, tags, titles, item types...');

  constructor() {
    window.addEventListener('resize', () => this.updatePlaceholder());
  }

  private updatePlaceholder(): void {
    this.searchPlaceholder.set(
      window.innerWidth < 1024 ? 'Search' : 'Search code body, tags, titles, item types...'
    );
  };

  toggleMobileSidebar(): void {
    this.service.toggleMobileSidebar();
  }
}
