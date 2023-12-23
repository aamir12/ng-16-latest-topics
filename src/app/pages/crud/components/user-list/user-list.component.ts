import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ActionEnum } from '../../model';
import { PostService } from '../../post.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  router = inject(Router);
  postService = inject(PostService);
  destroyRef = inject(DestroyRef);

  categories:any = [];
  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.postService.getCategories()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => {
      console.log(res);
      this.categories = res;
    })
  }
    

  addCategory() {
    this.router.navigate(['./crud/categories/create'],{state:{
      mode:ActionEnum.Create
    }})
  }

  onView(id:any) {
    this.router.navigate(['./crud/categories/view'],{state:{
      mode:ActionEnum.View,
      categoryId:id
    }})
  }

  onEdit(id:any) {
    this.router.navigate(['./crud/categories/edit'],{state:{
      mode:ActionEnum.Edit,
      categoryId:id
    }})
  }

  onDelete(id:any) {
    if(!confirm('Are you sure, You want to delete')) {
      return;
    }

    this.postService.deleteCategory(id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((res)=> {
      this.fetchCategories();
    })
  }
}
