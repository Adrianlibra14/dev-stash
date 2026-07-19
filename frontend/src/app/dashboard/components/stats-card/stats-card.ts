import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFolderHeart, lucideFolders, lucideLayers, lucideStar } from '@ng-icons/lucide';

@Component({
  selector: 'app-stats-card',
  imports: [NgIcon],
  templateUrl: './stats-card.html',
  viewProviders: [provideIcons({ lucideFolderHeart, lucideFolders, lucideLayers, lucideStar })],
})
export class StatsCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<number>();
  readonly icon = input.required<string>();
  readonly color = input.required<string>();
}
