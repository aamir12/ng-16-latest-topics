import { Component, OnInit, inject } from '@angular/core';
import { IPost, TodoService } from '../../todo.service';
import { Observable, finalize, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signal-crud',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './signal-crud.component.html',
  styleUrl: './signal-crud.component.scss'
})
export class SignalCrudComponent implements OnInit{
  todoService = inject(TodoService);
  fb = inject(UntypedFormBuilder);

  error!:string;
  isLoading = false;
  form = this.fb.group({
    id:[''],
    title:['',[Validators.required]]
  })

  get todos() {
    return this.todoService.resources;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.todoService.getPosts().pipe(
      take(1),
      finalize(() => this.isLoading = false)
      ).subscribe();
  }

  onEdit(todo:IPost) {
    // const formData = {
    //   id: todo.id?.toString(),
    //   title:todo.title
    // }
    this.form.patchValue(todo);
  }

  onDelete(todo:IPost) {
    this.todoService.deletePost(todo).pipe(
      take(1),
      finalize(() => this.isLoading = false)
      ).subscribe();
  }

  onSave() {
    if(this.form.invalid) {
      return
    }
    console.log(this.form.value);
    const post = this.form.value as IPost;
    let actionObs: Observable<IPost>;
    actionObs = post.id ? this.todoService.updatePost(post) : this.todoService.createPost(post);
    actionObs.pipe(
      take(1),
      finalize(() => this.isLoading = false)
    ).subscribe(() => this.form.reset())
  }


}
