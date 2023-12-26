import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MaterialModule } from 'src/app/core/modules/material.module';
import { NgTemplateOutletComponent } from '../ng-template-outlet/ng-template-outlet.component';
import { WeatherCustomActionComponent } from '../ng-template-outlet/weather-custom-action/weather-custom-action.component';
import { LazyDialogService } from 'src/app/core/services/lazy-dialog.service';
import { AkUsersComponent } from 'ak-users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule,MaterialModule,NgTemplateOutletComponent,WeatherCustomActionComponent,AkUsersComponent],
})
export class HomeComponent {
  lazyDialogService = inject(LazyDialogService);


}
