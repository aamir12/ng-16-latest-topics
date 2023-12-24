import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PostService } from '../../post.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delayWhen, finalize, of, retry, retryWhen, scan, timer } from 'rxjs';

@Component({
  selector: 'app-retry',
  standalone:true,
  templateUrl: './retry.component.html',
  styleUrls: ['./retry.component.scss'],
  imports:[CommonModule,RouterModule]
})
export class RetryComponent {
  router = inject(Router);
  postService = inject(PostService);
  destroyRef = inject(DestroyRef);

  posts:any = [];
  ngOnInit(): void {
   // this.fetchType1();
    //this.fetchType2();
    this.fetchType3();
  }

  fetchType1() {
    this.postService.getPosts()
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      retry({count: 5, delay: 2000}), 
      //old
      // retryWhen(err => err.pipe(
      //   scan(retryCount => {
      //     if (retryCount > 5) throw err;
      //     else {
      //       retryCount++;
      //       return retryCount;
      //     }
      //   }, 0),
      //   delayWhen(() => timer(1000))
      // ))
    )
    .subscribe({
      next:(res) => {
        console.log("success");
        console.log(res);
        this.posts = res;
      },
      error:(error) => {
        console.log("error");
        console.log(error);
      },
      complete: () => {
        console.log("complete")
      }
    });
  }

  fetchType2() {
    //condition inside retry
    this.postService.getPosts()
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      retry({count: 5, delay: (error, retryCount) => {
        return retryCount === 1 ? timer(2000) : of({})
      }}),
    )
    .subscribe({
      next:(res) => {
        console.log("success");
        console.log(res);
        this.posts = res;
      },
      error:(error) => {
        console.log("error");
        console.log(error);
      },
      complete: () => {
        console.log("complete")
      }
    });
  }

  //see inside service: latest version of retry
  fetchType3() {
    this.postService.allPosts()
    .pipe(
      takeUntilDestroyed(this.destroyRef),
    )
    .subscribe({
      next:(res) => {
        console.log("success");
        console.log(res);
        this.posts = res;
      },
      error:(error) => {
        console.log("error");
        console.log(error);
      },
      complete: () => {
        console.log("complete")
      }
    });
  }

  retry() {
    this.postService.retryFetchPost();
  }

}
