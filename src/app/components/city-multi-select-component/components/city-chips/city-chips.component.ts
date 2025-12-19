// city-chips.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-city-chips',
  standalone: true,
  imports: [MatChipsModule,CommonModule],
  templateUrl: './city-chips.component.html',
  styleUrls: ['./city-chips.component.scss']
})
export class CityChipsComponent {
  @Input() cities: string[] = [];
  @Input() disabled = false;

  get visibleCities(): string[] {
    return this.disabled && this.cities.length > 3
      ? this.cities.slice(0, 3)
      : this.cities;
  }

  get remainingCount(): number {
    return this.disabled && this.cities.length > 3
      ? this.cities.length - 3
      : 0;
  }
}
