import { Component, inject } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { Post } from '../../data.service';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent {
  post:Post|null = null
  constructor(private location:Location) {
    const state  = <{ postDetail:Post }>this.location.getState()
    if(state.postDetail){
      this.post = state.postDetail
    }

  }
}
