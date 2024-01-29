import { Component, OnInit, inject } from '@angular/core';
import { IPost, TodoService } from '../../todo.service';
import { Observable, catchError, finalize, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CreateArticalComponent } from '../create-artical/create-artical.component';
@Component({
  selector: 'app-signal-crud',
  standalone: true,
  imports: [CommonModule,CreateArticalComponent],
  templateUrl: './signal-crud.component.html',
  styleUrl: './signal-crud.component.scss'
})
export class SignalCrudComponent implements OnInit{
  todoService = inject(TodoService);
  error!:string;

  get todos() {
    return this.todoService.resources;
  }

  ngOnInit(): void {
    this.todoService.getPosts().pipe(
      take(1),
      ).subscribe({
        error: (error) => {
          console.log(error);
          this.error = error;
        }
      });
  }


  onDelete(todo:IPost) {
    this.todoService.deletePost(todo).pipe(
      take(1),
      ).subscribe();
  }

}
