import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    ClipboardModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    MatListModule,
    MatTabsModule,
    MatRadioModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatExpansionModule,
    MatSidenavModule,
    MatRippleModule,
    MatChipsModule,
    MatSelectModule,
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule, 
    MatPaginatorModule
  ]
})
export class MaterialModule { }