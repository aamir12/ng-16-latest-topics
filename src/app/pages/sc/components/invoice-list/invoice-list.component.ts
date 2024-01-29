import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SCService } from '../../sc.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActionEnum } from 'src/app/core/models/utility.model';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent  implements OnInit{
  router = inject(Router);
  postService = inject(SCService);
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
