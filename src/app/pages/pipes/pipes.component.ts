import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UppercaseFirstPipe } from './commonPipes/uppercase-first.pipe';
import { CardComponent } from 'src/app/components/card/card.component';
import { ReverseStringPipe } from './commonPipes/reverse-string.pipe';
import { FilterArrayPipe } from './commonPipes/filter-array.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeAgoPipe } from './commonPipes/time-ago-pipe.pipe';
import { MaskedInputPipe } from './commonPipes/masked-input.pipe';
import { RelativeTimePipe } from './commonPipes/relative-time.pipe';
import { OrdinalNumberPipe } from './commonPipes/ordinal-number.pipe';

@Component({
  selector: 'app-pipes',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,CardComponent,UppercaseFirstPipe,ReverseStringPipe,FilterArrayPipe,TimeAgoPipe,MaskedInputPipe,RelativeTimePipe,OrdinalNumberPipe],
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.scss']
})
export class PipesComponent {
  products:any[] = [
    {
      name:"Men\'s Shoes",
      category:'men'
    },
    {
      name:"Women\'s Shoes",
      category:'women'
    },
    {
      name:"Kid\'s Dress",
      category:'kid'
    }
  ]

  filterCategory = ''
  someTimestamp = new Date('2023-10-21');
  currentTimestamp = new Date();
  maskInputText = "1234567890"
}
