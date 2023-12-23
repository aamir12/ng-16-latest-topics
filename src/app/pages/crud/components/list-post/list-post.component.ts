import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ActionEnum } from '../../model';
import { PostService } from '../../post.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, forkJoin, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-list-post',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit{
  router = inject(Router);
  postService = inject(PostService);
  destroyRef = inject(DestroyRef);

  posts:any = [];
  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    combineLatest({
      posts:this.postService.getPosts(),
      categories: this.postService.getCategories()
    })
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => {
      console.log("fetchPostResponse")
      console.log(res);
      this.posts = res.posts.map(post => {
        post.category =  res.categories.find(cat => cat.id === +post.category)?.name || ''
        return post;
      })
    })
    
  }

  addPost() {
    this.router.navigate(['./crud/create'],{state:{
      mode:ActionEnum.Create
    }})
  }

  onView(id:any) {
    this.router.navigate(['./crud/view'],{state:{
      mode:ActionEnum.View,
      postId:id
    }})
  }

  onEdit(id:any) {
    this.router.navigate(['./crud/create'],{state:{
      mode:ActionEnum.Edit,
      postId:id
    }})
  }

  async onDelete(id:any) {
    if(!confirm('Are you sure, You want to delete')) {
      return;
    }

    const request = [];

    //remove post from all users list
    const allUsers = await lastValueFrom(this.postService.getUsers());
    allUsers.forEach(user => {
      const posts = user.posts  ? JSON.parse(user.posts) : [];
      if(posts.includes(id)) {
        user.posts = posts.filter((postId:any)=> postId !== id);
        request.push(lastValueFrom(this.postService.updateUser(user.id,{posts:JSON.stringify(user.posts)})))
      }
    })

    request.push(lastValueFrom(this.postService.deletePost(id)));
    await Promise.all(request);
    this.fetchPosts();
  
  }
}
