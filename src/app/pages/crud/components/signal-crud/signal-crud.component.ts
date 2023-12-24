import { Component, OnInit, inject } from '@angular/core';
import { IPost, TodoService } from '../../todo.service';
import { Observable, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signal-crud',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './signal-crud.component.html',
  styleUrl: './signal-crud.component.scss'
})
export class SignalCrudComponent implements OnInit{
  todoService = inject(TodoService);
  fb = inject(FormBuilder);

  form = this.fb.group({
    id:[-1],
    title:['',[Validators.required]]
  })

  get todos() {
    return this.todoService.resources;
  }

  ngOnInit(): void {
    this.todoService.getPosts().pipe(take(1)).subscribe();
  }

  onEdit(todo:IPost) {
    this.form.patchValue(todo);
  }

  onDelete(todo:IPost) {
    this.todoService.deletePost(todo).pipe(take(1)).subscribe();
  }

  onSave() {
    if(this.form.invalid) {
      return
    }
    console.log(this.form.value);
    const post = this.form.value as IPost;
    let actionObs: Observable<IPost>;
    actionObs = post.id === -1 ? this.todoService.createPost(post) : this.todoService.updatePost(post);
    actionObs.pipe(take(1)).subscribe(() => this.form.reset())
  }


}
