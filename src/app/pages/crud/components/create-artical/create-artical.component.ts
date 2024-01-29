import { CommonModule } from '@angular/common';
import { Component, OnInit, inject,effect, untracked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { IPost, TodoService } from '../../todo.service';
import { Observable, finalize, take } from 'rxjs';

@Component({
  selector: 'app-create-artical',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-artical.component.html',
  styleUrl: './create-artical.component.scss'
})
export class CreateArticalComponent{

  todoService = inject(TodoService);
  ufb = inject(UntypedFormBuilder);
  tfb = inject(FormBuilder);

  error!:string;
  isLoading = false;
  form = this.ufb.group({
    id:[null],
    title:['',[Validators.required]]
  });

  //typed form 
  myForm = new FormGroup({
    id: new FormControl<number| null>(null,{validators:[Validators.required]}),
    title: new FormControl<string| null>('')
  });


  onSave() {
    if(this.form.invalid) {
      return
    }
    const post = this.form.value as IPost;
    let actionObs: Observable<IPost>;
    actionObs = post.id ? this.todoService.updatePost(post) : this.todoService.createPost(post);
    actionObs.pipe(
      take(1)
    ).subscribe(() => this.form.reset())
  }

  setForm(post:IPost) {
    this.form.patchValue(post);
  }

  formEffect = effect(() => {
    const selectedPost = this.todoService.selectedPost();
    if(selectedPost) {
      this.setForm(selectedPost);
    }

    //it will execute without tracking
    untracked(() => {
      console.log("Logs")
    });
  })
}
