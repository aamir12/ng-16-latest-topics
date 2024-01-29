import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sc',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sc.component.html',
  styleUrls: ['./sc.component.scss']
})
export class SCComponent {

}
