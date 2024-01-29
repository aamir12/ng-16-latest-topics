import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { DataService, Post } from '../../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoService } from '../../../../core/services/crypto.service';

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
  cryptoService = inject(CryptoService);

  posts$ = this.http.getPosts();

  openPost(post:Post) {
    this.router.navigate(['/custom-directives/single-post'],{
      state:{
        postDetail:post
      },
    })
  }

  customNavigate(id:number) {
    const encryptedId = this.cryptoService.encrypt(id.toString());
    this.router.navigate(['/custom-directives/single-post',id,encryptedId],{
      queryParams:{mode:'create'},
    })
  }

  onBack() {
    this.location.back();
  }
}
