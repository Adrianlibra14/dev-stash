import { Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideStar, lucidePin } from '@ng-icons/lucide';

import type { MockItem, MockItemType } from '../../../../mock/mock-data';

@Component({
  selector: 'app-item-card',
  imports: [NgIcon],
  templateUrl: './item-card.html',
  viewProviders: [provideIcons({ lucideStar, lucidePin })],
})
export class ItemCardComponent {
  readonly item = input.required<MockItem>();
  readonly itemType = input.required<MockItemType>();
  readonly language = input<string | null>(null);

  readonly itemClick = output<string>();

  onClick(): void {
    this.itemClick.emit(this.item().id);
  }
}
