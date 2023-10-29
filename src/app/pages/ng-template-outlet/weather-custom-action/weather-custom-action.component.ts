import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgTemplateOutletComponent } from '../ng-template-outlet.component';

@Component({
  selector: 'app-weather-custom-action',
  standalone: true,
  imports: [CommonModule],
  template: `<button class="btn btn-primary" (click)="onClick()">Reload & Copy</button>`,
})
export class WeatherCustomActionComponent {
  weatherWidget = inject(NgTemplateOutletComponent);

  onClick() {
    this.weatherWidget.actions.reload();
    this.weatherWidget.actions.copyData();
  }
}
