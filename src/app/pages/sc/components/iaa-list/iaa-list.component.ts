import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SCService } from '../../sc.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, forkJoin, lastValueFrom } from 'rxjs';
import { CryptoService } from 'src/app/core/services/crypto.service';
import { ActionEnum, SessionKey } from 'src/app/core/models/utility.model';
import { removeSession } from 'src/app/core/services/utility.fn';

@Component({
  selector: 'app-iaa-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './iaa-list.component.html',
  styleUrls: ['./iaa-list.component.scss']
})
export class IAAListComponent implements OnInit{
  router = inject(Router);
  scService = inject(SCService);
  destroyRef = inject(DestroyRef);
  cryptoService = inject(CryptoService)

  iaas:any = [];
  ngOnInit(): void {
    removeSession(SessionKey.IAA);
    this.fetchIaas();
  }

  fetchIaas() {
    combineLatest({
      iaas:this.scService.getIaas(),
      agencies: this.scService.getAgencies(),
      contractors: this.scService.getContractors()
    })
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => {
      console.log("fetchIaas")
      console.log(res);
      this.iaas = res.iaas.map(post => {
        post.requestAgency =  res.agencies.find(agency => agency.id === +post.requestAgency)?.name || ''
        post.serviceAgency =  res.agencies.find(agency => agency.id === +post.serviceAgency)?.name || ''
        post.contractor =  res.contractors.find(contractor => contractor.id === +post.contractor)?.name || ''
        return post;
      })
    })
    
  }

  addPost() {
    this.router.navigate(['/sc','iaas','create'],{state:{
      mode:ActionEnum.Create
    }})
  }

  onView(id:any) {
    const encID = this.cryptoService.encrypt(JSON.stringify({
      iaaId: id,
      mode: ActionEnum.View
    }));
    this.router.navigate(['/sc','iaas',encID]);
    // this.router.navigate(['./crud/view'],{state:{
    //   mode:ActionEnum.View,
    //   postId:id
    // }})
  }

  onEdit(id:any) {
    const encID = this.cryptoService.encrypt(JSON.stringify({
      iaaId: id,
      mode: ActionEnum.Edit
    }));
    this.router.navigate(['/sc','iaas',encID]);
    // this.router.navigate(['./crud/create'],{state:{
    //   mode:ActionEnum.Edit,
    //   postId:id
    // }})
  }

  async onDelete(id:any) {
    if(!confirm('Are you sure, You want to delete')) {
      return;
    }

    const request = [];

    //remove post from all users list
    const allUsers = await lastValueFrom(this.scService.getUsers());
    allUsers.forEach(user => {
      const posts = user.posts  ? JSON.parse(user.posts) : [];
      if(posts.includes(id)) {
        user.posts = posts.filter((postId:any)=> postId !== id);
        request.push(lastValueFrom(this.scService.updateUser(user.id,{posts:JSON.stringify(user.posts)})))
      }
    })

    request.push(lastValueFrom(this.scService.deletePost(id)));
    await Promise.all(request);
    this.fetchIaas();
  
  }
}
