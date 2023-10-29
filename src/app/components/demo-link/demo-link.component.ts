import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demo-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demo-link.component.html',
  styleUrls: ['./demo-link.component.scss']
})
export class DemoLinkComponent {
  @Input({required:true}) link!:string;
  @Input({required:true}) title!:string;
}
