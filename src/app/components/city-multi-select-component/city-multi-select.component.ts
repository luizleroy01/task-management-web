import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CityChipsComponent } from './components/city-chips/city-chips.component';


@Component({
  selector: 'app-city-multi-select',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    CityChipsComponent
  ],
  templateUrl: './city-multi-select.component.html',
  styleUrls: ['./city-multi-select.component.scss']
})
export class CityMultiSelectComponent {
  @Input() cities: string[] = [];  // lista de cidades disponíveis
  @Input() disabled = false;       // estado do componente

  control = new FormControl<string[]>([]);
}