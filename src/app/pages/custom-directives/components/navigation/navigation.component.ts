import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { DataService, Post } from '../../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  http = inject(DataService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  location = inject(Location);

  posts$ = this.http.getPosts();

  openPost(post:Post) {
    this.router.navigate(['/custom-directives/single-post'],{
      state:{
        postDetail:post
      },
    })
  }

  customNavigate(id:number) {
    this.router.navigate(['/custom-directives/single-post',id],{
      queryParams:{mode:'create'},
    })
  }

  onBack() {
    this.location.back();
  }
}
