import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/core/modules/material.module';
import { TagSliderComponent } from '../tag-slider/tag-slider.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule,MaterialModule,TagSliderComponent],
})
export class HomeComponent {
  tags: string[] = [
    'All',
    'Music',
    'Chess',
    'Live',
    'Gaming',
    'Editing',
    'Mixing consoles',
    'Comedy',
    'Computer Hardware',
    'News',
    'Computer Programming',
    'Video Editing Software',
    'Sports'
  ];

  selectedTab(tag:string) {
    console.log(tag)
  }

}
